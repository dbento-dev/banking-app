import { getAccountsByUserId } from "@/api/accountService";
import { Account } from "@/types/accountEntities";
import { useEffect, useState } from "react";

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
        const accountsData = await getAccountsByUserId(userId);
        if (accountsData && accountsData.length > 0) {
          setAccount(accountsData[0]);
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
