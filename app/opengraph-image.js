import { ImageResponse } from "next/og";
import { getSettings } from "@/lib/settings";

export const alt = "Portfolio preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const { content: site, theme } = await getSettings();
  const light = theme.light || {};
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: light.paper || "#EEF2F6",
          color: light.ink || "#14213D",
        }}
      >
        <div style={{ fontSize: 120, fontWeight: 700 }}>{site.name}</div>
        <div style={{ fontSize: 48, color: light.accent || "#2B50FF", marginTop: 20 }}>{site.role}</div>
      </div>
    ),
    size
  );
}