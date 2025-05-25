import { Transaction } from "@/types/transactionEntities";
import { useEffect, useState } from "react";

const TRANSACTION_URL = "http://localhost:4000/transactions";

export function useTransactionData(accountId: string | null | undefined) {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  const [transactionsError, setTransactionsError] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!accountId) {
      setTransactions(null);
      setIsLoadingTransactions(false);
      setTransactionsError(null);
      return;
    }

    const fetchTransactions = async () => {
      setIsLoadingTransactions(true);
      setTransactions(null);
      setTransactionsError(null);
      try {
        const response = await fetch(
          `${TRANSACTION_URL}/findByAccountId?accountId=${encodeURIComponent(accountId)}`
        );
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error ||
              `Erro ao buscar transações: ${response.status} ${response.statusText}`
          );
        }
        const transactionsData: Transaction[] = await response.json();
        setTransactions(transactionsData);
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
    };

    fetchTransactions();
  }, [accountId]);

  return { transactions, isLoadingTransactions, transactionsError };
}
