"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

import DashboardHeader from "@/app/dashboard/components/DashboardHeader/DashboardHeader";
import BalanceCard from "@/app/dashboard/components/BalanceCard/BalanceCard";
import TransactionForm from "@/app/dashboard/components/TransactionForm/TransactionForm";
import ExtractContent from "@/app/dashboard/components/ExtractContent/ExtractContent";

import { useUserData } from "@/hooks/useUserData";
import { useAccountData } from "@/hooks/useAccountData";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const activeSection = searchParams.get("section") || "inicio";

  const userEmail = "alice@email.com";
  const { user, isLoadingUser } = useUserData(userEmail);
  const { account, isLoadingAccount } = useAccountData(user?.id);

  const renderMainContent = (section: string | null) => {
    switch (section) {
      case "inicio":
        return (
          <div className=" flex flex-col gap-5 px-4 md:flex-row md:h-[90vh] overflow-y-auto">
            <div className="flex-grow rounded-xl bg-[var(--surface)] p-5">
              {isLoadingUser && (
                <p className="text-center">
                  Carregando informações do usuário...
                </p>
              )}

              {user && <DashboardHeader name={user.name} />}

              <div className="h-[90%] mt-4 flex flex-col items-center gap-5">
                {isLoadingAccount && (
                  <p className="text-center">Carregando dados da conta...</p>
                )}

                {user && account && (
                  <BalanceCard
                    accountType={account.account_type}
                    cardNumber={account.card_number}
                    expirationDate={account.expiration_date}
                    balance={parseFloat(account.balance)}
                  />
                )}

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
