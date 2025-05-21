"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

import DashboardHeader from "@/app/dashboard/components/DashboardHeader/DashboardHeader";
import BalanceCard from "@/app/dashboard/components/BalanceCard/BalanceCard";
import TransactionForm from "@/app/dashboard/components/TransactionForm/TransactionForm";
import ExtractContent from "@/app/dashboard/components/ExtractContent/ExtractContent";

export default function Home() {
  const searchParams = useSearchParams();
  const activeSection = searchParams.get("section") || "inicio";

  const renderMainContent = (section: string | null) => {
    switch (section) {
      case "inicio":
        return (
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 max-md:pt-20">
            <div className="flex flex-col gap-4 xl:flex-row">
              <div className="flex h-full flex-grow flex-col rounded-xl bg-[var(--surface)] px-4 py-8 sm:px-8 md:px-10 lg:px-20">
                <DashboardHeader name="Joana" />
                <div className="mt-8 flex flex-1 flex-col gap-6">
                  <div className="w-full">
                    <BalanceCard
                      accountType="Conta Corrente"
                      balance={2500.0}
                    />
                  </div>
                  <div className="w-full">
                    <TransactionForm />
                  </div>
                </div>
              </div>
              <div className="w-full rounded-xl bg-[var(--surface)] xl:w-[320px]">
                <ExtractContent />
              </div>
            </div>
          </div>
        );
      case "transferencias":
        return (
          <div className="rounded-xl bg-[var(--surface)] p-4 md:p-6">
            <h2 className="text-xl font-semibold md:text-2xl">
              Transferências
            </h2>
          </div>
        );
      case "investimentos":
        return (
          <div className="rounded-xl bg-[var(--surface)] p-4 md:p-6">
            <h2 className="text-xl font-semibold md:text-2xl">Investimentos</h2>
          </div>
        );
      case "servicos":
        return (
          <div className="rounded-xl bg-[var(--surface)] p-4 md:p-6">
            <h2 className="text-xl font-semibold md:text-2xl">
              Outros Serviços
            </h2>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      {renderMainContent(activeSection)}
    </div>
  );
}
