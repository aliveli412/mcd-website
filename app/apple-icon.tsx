import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2A3520",
          borderRadius: 36,
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: 108,
            fontWeight: 800,
            color: "#2D8B5F",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          M
        </div>
        <div
          style={{
            position: "absolute",
            top: 36,
            right: 36,
            width: 28,
            height: 28,
            borderRadius: 14,
            background: "#2A6BAD",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
