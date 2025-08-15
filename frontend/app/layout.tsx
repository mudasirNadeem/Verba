import type { Metadata } from "next";
import { Amiri } from "next/font/google";
import "./globals.css";

const amiri = Amiri({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-amiri",
});

export const metadata: Metadata = {
  title: "RAG Assistant", // Changed from "Verba"
  description: "The GoldenRAGtriever",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${amiri.variable} font-amiri overflow-x-hidden`}>
      <link rel="icon" href="icon.ico" />
      <link rel="icon" href="static/icon.ico" />
      <body className={`${amiri.className} font-amiri overflow-x-hidden`}>{children}</body>
    </html>
  );
}
