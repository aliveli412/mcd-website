import { ImageResponse } from "next/og";

export const alt = "Munzur Çevre Derneği";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(145deg, #2A3520 0%, #1a2218 55%, #2D8B5F 100%)",
          color: "#F5F1E8",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#7bc9a0",
            marginBottom: 24,
          }}
        >
          Munzur Çevre Derneği
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            maxWidth: 900,
          }}
        >
          Doğaya ve özgür yaşama sahip çıkıyoruz
        </div>
        <div style={{ fontSize: 26, marginTop: 32, opacity: 0.85 }}>
          munzurcevredernegi.net · 2003&apos;ten beri
        </div>
      </div>
    ),
    { ...size },
  );
}
