"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

import DashboardHeader from "@/app/dashboard/components/DashboardHeader/DashboardHeader";
import BalanceCard from "@/app/dashboard/components/BalanceCard/BalanceCard";
import TransactionForm from "@/app/dashboard/components/TransactionForm/TransactionForm";
import ExtractContent from "@/app/dashboard/components/ExtractContent/ExtractContent";

import { useUserData } from "@/hooks/useUserData";
import { useAccountData } from "@/hooks/useAccountData";

export default function Home() {
  const searchParams = useSearchParams();
  const activeSection = searchParams.get("section") || "inicio";

  const userEmail = "alice@email.com";
  const { user, isLoadingUser } = useUserData(userEmail);
  const { account, isLoadingAccount } = useAccountData(user?.id);

  const renderMainContent = (section: string | null) => {
    switch (section) {
      case "inicio":
        return (
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 max-md:pt-20">
            <div className="flex flex-col gap-4 xl:flex-row">
              <div className="flex h-full flex-grow flex-col rounded-xl bg-[var(--surface)] px-4 py-8 sm:px-8 md:px-10 lg:px-20">
                {isLoadingUser && (
                  <p className="text-center">
                    Carregando informações do usuário...
                  </p>
                )}

                {user && <DashboardHeader name={user.name} />}

                <div className="mt-8 flex flex-1 flex-col gap-6">
                  <div className="w-full">
                    {isLoadingAccount && (
                      <p className="text-center">
                        Carregando dados da conta...
                      </p>
                    )}

                    {user && account && (
                      <BalanceCard
                        accountType={account.account_type}
                        cardNumber={account.card_number}
                        expirationDate={account.expiration_date}
                        balance={parseFloat(account.balance)}
                      />
                    )}
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
