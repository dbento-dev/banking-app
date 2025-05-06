"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

import DashboardHeader from "@/app/dashboard/components/DashboardHeader/DashboardHeader";
import BalanceCard from "@/app/dashboard/components/BalanceCard/BalanceCard";
import TransactionForm from "@/app/dashboard/components/TransactionForm/TransactionForm";
import ExtractContent from "@/app/dashboard/components/ExtractContent/ExtractContent";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const activeSection = searchParams.get("section") || "inicio";

  const renderMainContent = (section: string | null) => {
    switch (section) {
      case "inicio":
        return (
          <div className="ml-6 flex h-[96vh] flex-row">
            <div className="mr-6 flex-4/6 rounded-xl bg-[var(--surface)] px-18 py-12">
              <DashboardHeader name="Joana" />
              <div className="mt-8 flex flex-col items-center gap-6">
                <BalanceCard accountType="Conta Corrente" balance={2500.0} />
                <TransactionForm />
              </div>
            </div>
            <div className="flex-1/6 rounded-xl bg-[var(--surface)]">
              <ExtractContent />
            </div>
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
