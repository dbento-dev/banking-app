"use client";

import React from "react";
import SideBar from "@/app/dashboard/components/SideBar/SideBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex bg-[var(--background)] p-4">
      <SideBar />
      <div className="h-full w-full">
        <main className="overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
