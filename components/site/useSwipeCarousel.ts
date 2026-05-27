"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

const SWIPE_THRESHOLD_PX = 40;

export function useSwipeCarousel(length: number) {
  const [index, setIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const drag = useRef({
    startX: 0,
    active: false,
    dragged: false,
    pointerId: -1,
    captureEl: null as HTMLElement | null,
  });

  useEffect(() => {
    if (length === 0) return;
    setIndex((i) => (i >= length ? 0 : i));
  }, [length]);

  const go = useCallback(
    (next: number) => {
      if (length === 0) return;
      setIndex(((next % length) + length) % length);
    },
    [length],
  );

  const goBy = useCallback(
    (delta: number) => {
      if (length === 0) return;
      setIndex((i) => (((i + delta) % length) + length) % length);
    },
    [length],
  );

  const beginDrag = useCallback((e: ReactPointerEvent<HTMLElement>) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest("a, button, input, textarea, select, label")) return;

    drag.current = {
      startX: e.clientX,
      active: true,
      dragged: false,
      pointerId: e.pointerId,
      captureEl: e.currentTarget,
    };
    setIsDragging(false);
    setDragOffset(0);
  }, []);

  const moveDrag = useCallback((e: ReactPointerEvent<HTMLElement>) => {
    if (!drag.current.active) return;
    const delta = e.clientX - drag.current.startX;

    if (!drag.current.dragged && Math.abs(delta) > 8) {
      drag.current.dragged = true;
      setIsDragging(true);
      try {
        drag.current.captureEl?.setPointerCapture(drag.current.pointerId);
      } catch {
        /* ignore */
      }
    }

    if (!drag.current.dragged) return;

    setDragOffset(delta);
    e.preventDefault();
  }, []);

  const endDrag = useCallback(
    (e: ReactPointerEvent<HTMLElement>, swipeThreshold = SWIPE_THRESHOLD_PX) => {
      if (!drag.current.active) return;
      const delta = e.clientX - drag.current.startX;
      drag.current.active = false;
      setIsDragging(false);
      setDragOffset(0);

      if (drag.current.dragged) {
        try {
          drag.current.captureEl?.releasePointerCapture(drag.current.pointerId);
        } catch {
          /* already released */
        }
      }

      if (Math.abs(delta) >= swipeThreshold) {
        goBy(delta > 0 ? -1 : 1);
      } else {
        drag.current.dragged = false;
      }
    },
    [goBy],
  );

  const cancelDrag = useCallback(() => {
    drag.current.active = false;
    drag.current.dragged = false;
    setIsDragging(false);
    setDragOffset(0);
  }, []);

  const dragHandlers = {
    onDragStart: (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
    },
    onPointerDownCapture: beginDrag,
    onPointerMove: moveDrag,
    onPointerUp: (e: ReactPointerEvent<HTMLElement>) => endDrag(e),
    onPointerCancel: cancelDrag,
    onClickCapture: (e: ReactMouseEvent<HTMLElement>) => {
      if (drag.current.dragged) {
        e.preventDefault();
        e.stopPropagation();
        drag.current.dragged = false;
      }
    },
  };

  return {
    index,
    go,
    goBy,
    setIndex,
    dragOffset,
    isDragging,
    dragHandlers,
    endDrag,
  };
}
