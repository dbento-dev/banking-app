"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const activeSection = searchParams.get("section") || "inicio";

  const renderMainContent = (section: string | null) => {
    switch (section) {
      case "inicio":
        return (
          <div>
            <h2>Dashboard</h2>
          </div>
        );
      case "transferencias":
        return (
          <div>
            <h2>Transferências</h2>
          </div>
        );
      case "investimentos":
        return (
          <div>
            <h2>Investimentos</h2>
          </div>
        );
      case "servicos":
        return (
          <div>
            <h2>Outros Serviços</h2>
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderMainContent(activeSection)}</>;
}
