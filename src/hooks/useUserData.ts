import { getUserByEmail } from "@/api/userService";
import { User } from "@/types/userEntities";
import { useCallback, useEffect, useState } from "react";

export function useUserData(email: string | null) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);

  const fetchUser = useCallback(async (email: string | null) => {
    if (!email) {
      setUser(null);
      return;
    }
    setIsLoadingUser(true);
    setUserError(null);

    try {
      const userData = await getUserByEmail(email);
      setUser(userData);
      return userData;
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
  }, []);

  useEffect(() => {
    fetchUser(email);
  }, [email, fetchUser]);

  return { user, isLoadingUser, userError, refetchUser: fetchUser };
}
