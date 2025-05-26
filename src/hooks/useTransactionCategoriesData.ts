import { getTransactionCategories } from "@/api/transactionService";
import { TransactionCategory } from "@/types/transactionEntities";
import { useCallback, useEffect, useState } from "react";

export function useTransactionCategoriesData() {
  const [categories, setCategories] = useState<TransactionCategory[] | null>(
    null
  );
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setIsLoadingCategories(true);
    setCategoriesError(null);

    try {
      const categoriesData = await getTransactionCategories();
      setCategories(categoriesData);
      return categoriesData;
    } catch (error) {
      console.error("Falha ao buscar categorias de transação no hook:", error);
      setCategoriesError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao buscar categorias de transação."
      );
    } finally {
      setIsLoadingCategories(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    transactionCategories: categories,
    isLoadingCategories,
    categoriesError,
  };
}
