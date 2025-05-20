// src/hooks/useUserData.ts
import { useState, useEffect } from "react";
import { User } from "@/types/userEntities";

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
        const response = await fetch(
          `/api/users/findByEmailProxy?email=${encodeURIComponent(email)}`
        );
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error ||
              `Erro ao buscar usuário: ${response.status} ${response.statusText}`
          );
        }
        const userData: User = await response.json();
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
