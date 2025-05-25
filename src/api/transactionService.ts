import { Transaction } from "@/types/transactionEntities";
import { apiFetch } from "./client";

const TRANSACTION_ENDPOINT = "transactions";

export async function getTransactionsByAccountId(
  accountId: string
): Promise<Transaction[]> {
  const response = await apiFetch(
    `${TRANSACTION_ENDPOINT}/findByAccountId?accountId=${encodeURIComponent(accountId)}`
  );
  return response.json();
}
