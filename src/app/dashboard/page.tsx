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
          <div className=" flex flex-col gap-5 px-4 md:flex-row md:h-[90vh] overflow-y-auto">
            <div className="flex-grow rounded-xl bg-[var(--surface)] p-5">
              <DashboardHeader name="Joana" />
              <div className="h-[90%] mt-4 flex flex-col items-center gap-5">
                <BalanceCard accountType="Conta Corrente" balance={2500.0} />
                <TransactionForm />
              </div>
            </div>
            <div className="w-full rounded-xl bg-[var(--surface)] md:max-w-sm">
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
