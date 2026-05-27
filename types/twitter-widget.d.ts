export {};

declare global {
  interface Window {
    twttr?: {
      ready: (callback: () => void) => void;
      widgets: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}
