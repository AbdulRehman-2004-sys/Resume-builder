import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#111827",
          borderRadius: "14px",
          color: "white",
          display: "flex",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: 34,
          fontWeight: 800,
          height: "100%",
          justifyContent: "center",
          letterSpacing: 0,
          width: "100%",
        }}
      >
        R
      </div>
    ),
    size,
  );
}
