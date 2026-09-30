import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SAHAYAK AI — Well-being Monitoring",
  description:
    "AI-powered dynamic well-being monitoring and distress decision-support system. Prototype — synthetic data only.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">
        {children}
        <p className="pointer-events-none fixed bottom-3 left-1/2 z-40 -translate-x-1/2 rounded-full border border-border-default bg-bg-surface px-3 py-1 text-xs text-text-muted">
          PROTOTYPE · SYNTHETIC DATA
        </p>
      </body>
    </html>
  );
}
