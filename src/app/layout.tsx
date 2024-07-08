import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TL;DR - Quick Summary ",
  description: "Get quick TL;DR summaries without reading.",
  keywords: "TL;DR, summary, quick summaries,Rishi, brief overview",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <Providers>
    <html>
      <body>{children}</body>
    </html>
    </Providers>
    </ClerkProvider>
  );
}
