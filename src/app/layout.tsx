import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import CommandDock from "@/components/CommandDock";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AYUBOWAN SPATIAL",
  description: "A Luxury AI Travel Discovery Engine for Sri Lanka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${playfairDisplay.variable}`}>
        <Providers>
          {children}
          <CommandDock />
        </Providers>
      </body>
    </html>
  );
}
