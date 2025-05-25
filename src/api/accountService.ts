import { Account } from "@/types/accountEntities";
import { apiFetch } from "./client";

const ACCOUNT_ENDPOINT = "accounts";

export async function getAccountsByUserId(userId: string): Promise<Account[]> {
  const response = await apiFetch(
    `${ACCOUNT_ENDPOINT}/findByUserId?userId=${encodeURIComponent(userId)}`
  );
  return response.json();
}
