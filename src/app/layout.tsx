import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn, constructMetadata } from "../lib/utils";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "sonner";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn("antialiased h-full relative", inter.className)}>
        <main className="flex flex-col min-h-screen">
          <Providers>
            <Navbar />
            <div className="flex-grow flex-1">{children}</div>
            <Footer />
          </Providers>
        </main>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
