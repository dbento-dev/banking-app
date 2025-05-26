import {
  Transaction,
  TransactionCategory,
  TransactionCreate,
} from "@/types/transactionEntities";
import { apiFetch } from "./client";

const TRANSACTION_ENDPOINT = "transactions";
const TRANSACTION_CATEGORIES_ENDPOINT = "transaction-categories";

export async function getTransactionsByAccountId(
  accountId: string
): Promise<Transaction[]> {
  const response = await apiFetch(
    `${TRANSACTION_ENDPOINT}/findByAccountId?accountId=${encodeURIComponent(accountId)}`
  );
  return response.json();
}

export async function createTransaction(
  transactionData: TransactionCreate
): Promise<Transaction> {
  const response = await apiFetch(TRANSACTION_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(transactionData),
  });
  return response.json();
}

export async function getTransactionCategories(): Promise<
  TransactionCategory[]
> {
  const response = await apiFetch(TRANSACTION_CATEGORIES_ENDPOINT);
  return response.json();
}
