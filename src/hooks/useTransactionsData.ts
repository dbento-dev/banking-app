import { getTransactionsByAccountId } from "@/api/transactionService";
import { Transaction } from "@/types/transactionEntities";
import { useCallback, useEffect, useState } from "react";

export function useTransactionData(accountId: string | null | undefined) {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  const [transactionsError, setTransactionsError] = useState<string | null>(
    null
  );

  const fetchTransactions = useCallback(async () => {
    if (!accountId) {
      setTransactions(null);
      return;
    }
    setIsLoadingTransactions(true);
    setTransactionsError(null);

    try {
      const transactionsData = await getTransactionsByAccountId(accountId);
      setTransactions(transactionsData);
      return transactionsData;
    } catch (error) {
      console.error("Falha ao buscar transações no hook:", error);
      setTransactionsError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao buscar transações."
      );
    } finally {
      setIsLoadingTransactions(false);
    }
  }, [accountId]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    isLoadingTransactions,
    transactionsError,
    refetchTransactions: fetchTransactions,
  };
}
