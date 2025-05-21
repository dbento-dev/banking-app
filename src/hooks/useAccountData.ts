// src/hooks/useAccountData.ts
import { useState, useEffect } from "react";
import { Account } from "@/types/accountEntities";
export function useAccountData(userId: string | null | undefined) {
  const [account, setAccount] = useState<Account | null>(null);
  const [isLoadingAccount, setIsLoadingAccount] = useState(false);
  const [accountError, setAccountError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setAccount(null);
      setIsLoadingAccount(false);
      setAccountError(null);
      return;
    }

    const fetchAccount = async () => {
      setIsLoadingAccount(true);
      setAccount(null);
      setAccountError(null);
      try {
        const response = await fetch(
          `http://localhost:4000/accounts/findByUserId?userId=${encodeURIComponent(userId)}`
        );
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error ||
              `Erro ao buscar conta: ${response.status} ${response.statusText}`
          );
        }
        const accountsData: Account[] = await response.json();
        if (accountsData && accountsData.length > 0) {
          const correnteAccount = accountsData.find(
            (acc) => acc.account_type === "corrente"
          );
          setAccount(correnteAccount || accountsData[0]);
        } else {
          console.warn(
            "Nenhuma conta encontrada para o usuário no hook:",
            userId
          );
        }
      } catch (error) {
        console.error("Falha ao buscar dados da conta no hook:", error);
        setAccountError(
          error instanceof Error
            ? error.message
            : "Erro desconhecido ao buscar conta."
        );
      } finally {
        setIsLoadingAccount(false);
      }
    };

    fetchAccount();
  }, [userId]);

  return { account, isLoadingAccount, accountError };
}
