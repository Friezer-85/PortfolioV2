import "../global.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
	title: {
		default: "Portfolio - Friezer",
		template: "%s | Portfolio - Friezer",
	},
	description: "A young boy passionate by computers science.",
	openGraph: {
		title: "Portfolio - Friezer",
		description: "A young boy passionate by computers science.",
		url: "https://friezer.eu",
		siteName: "Portfolio - Friezer",
		//images: [
		//	{
		//		url: "https://friezer.eu/og.png",
		//		width: 1920,
		//		height: 1080,
		//	},
		//],
		locale: "en-US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: "Portfolio - Friezer",
		card: "summary_large_image",
	},
	//icons: {
	//	shortcut: "/favicon.png",
	//},
};
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const calSans = LocalFont({
	src: "../public/fonts/CalSans-SemiBold.ttf",
	variable: "--font-calsans",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
			<body
				className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
					}`}
			>
				{children}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
