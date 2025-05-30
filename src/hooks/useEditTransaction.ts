// src/hooks/useEditTransaction.ts
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { toast } from "sonner";
import { editTransaction } from "@/api/transactionService";
import { TransactionEdit, Transaction } from "@/types/transactionEntities";

interface UseEditTransactionProps {
  onSuccess?: (data: Transaction) => void;
}

export function useEditTransaction({
  onSuccess: onMutationSuccess,
}: UseEditTransactionProps = {}): UseMutationResult<
  Transaction,
  Error,
  TransactionEdit
> {
  const mutation = useMutation<Transaction, Error, TransactionEdit>({
    mutationFn: (transactionData: TransactionEdit) =>
      editTransaction(transactionData),
    onSuccess: (data) => {
      toast.success("Transação editada com sucesso!");
      if (onMutationSuccess) onMutationSuccess(data);
    },
    onError: (err) => {
      toast.error(
        `Falha ao editar transação: ${err.message || "Erro desconhecido"}`
      );
    },
  });

  return mutation;
}
