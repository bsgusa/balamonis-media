import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Balamonis Studio — AI Creative Engine",
  description:
    "Type a brief. Get a full campaign — ads, a video script, a track, and social — generated in seconds. AI-augmented production by Balamonis Media.",
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
