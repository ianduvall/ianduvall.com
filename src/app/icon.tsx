import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
	return new ImageResponse(
		(
			<div
				style={{
					fontSize: 18,
					background: "white",
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: "#3b82f6",
					fontWeight: 700,
					fontFamily: "system-ui, sans-serif",
					borderRadius: 6,
				}}
			>
				ID
			</div>
		),
		{ ...size },
	);
}
