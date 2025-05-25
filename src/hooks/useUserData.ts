// src/hooks/useUserData.ts
import { getUserByEmail } from "@/api/userService";
import { User } from "@/types/userEntities";
import { useEffect, useState } from "react";

export function useUserData(email: string | null) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) {
      setUser(null);
      setIsLoadingUser(false);
      setUserError(null);
      return;
    }

    const fetchUser = async () => {
      setIsLoadingUser(true);
      setUser(null);
      setUserError(null);
      try {
        const userData = await getUserByEmail(email);
        setUser(userData);
      } catch (error) {
        console.error("Falha ao buscar dados do usuário no hook:", error);
        setUserError(
          error instanceof Error
            ? error.message
            : "Erro desconhecido ao buscar usuário."
        );
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUser();
  }, [email]);

  return { user, isLoadingUser, userError };
}
