import { User } from "@/types/userEntities";
import { apiFetch } from "./client";

const USER_ENDPOINT = "users";

export async function getUserByEmail(email: string): Promise<User> {
  const response = await apiFetch(
    `${USER_ENDPOINT}/findByEmail?email=${encodeURIComponent(email)}`
  );
  return response.json();
}
