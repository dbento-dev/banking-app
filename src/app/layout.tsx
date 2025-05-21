"use client";

import React from "react";
import { Space_Grotesk } from "next/font/google";
import SideBar from "@/app/dashboard/components/SideBar/SideBar";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" className={spaceGrotesk.variable}>
      <body>
        <div className="flex bg-[var(--background)] px-4 py-6">
          <SideBar />
          <div className="w-full flex-1 px-2 sm:px-4 md:px-6">
            <main className="h-full w-full overflow-y-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
