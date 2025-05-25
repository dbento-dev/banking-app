import { getAccountsByUserId } from "@/api/accountService";
import { Account } from "@/types/accountEntities";
import { useCallback, useEffect, useState } from "react";

export function useAccountData(userId: string | null | undefined) {
  const [account, setAccount] = useState<Account | null>(null);
  const [isLoadingAccount, setIsLoadingAccount] = useState(false);
  const [accountError, setAccountError] = useState<string | null>(null);

  const fetchAccount = useCallback(async () => {
    if (!userId) {
      setAccount(null);
      return;
    }

    setIsLoadingAccount(true);
    setAccountError(null);

    try {
      const accountsData = await getAccountsByUserId(userId);
      if (accountsData && accountsData.length > 0) {
        setAccount(accountsData[0]);
        return accountsData[0];
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
  }, [userId]);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  return {
    account,
    isLoadingAccount,
    accountError,
    refetchAccount: fetchAccount,
  };
}
