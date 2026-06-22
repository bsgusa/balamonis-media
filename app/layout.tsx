import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.URL || // Netlify provides this automatically at build time
  "https://balamonis-studio.netlify.app";

const description =
  "Type a one-line brief. Get a full campaign — ad concepts, a shot-listed video, an original track, and social posts — generated in seconds, then copy or download it as Markdown. AI-augmented production by Balamonis Media.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Balamonis Studio — AI Creative Engine",
  description,
  applicationName: "Balamonis Studio",
  keywords: [
    "AI campaign generator",
    "ad concepts",
    "video shot list",
    "AI music",
    "social media copy",
    "Balamonis Media",
    "creative engine",
  ],
  authors: [{ name: "Balamonis Media" }],
  openGraph: {
    title: "Balamonis Studio — AI Creative Engine",
    description:
      "Type a brief. We'll direct the rest — ads, a shot-listed video, an original track, and social, in seconds.",
    url: siteUrl,
    siteName: "Balamonis Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Balamonis Studio — AI Creative Engine",
    description:
      "Type a brief. We'll direct the rest — ads, video, music, and social, in seconds.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grain vignette font-body antialiased">{children}</body>
    </html>
  );
}
