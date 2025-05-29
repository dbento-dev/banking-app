"use client";

import { createTransaction } from "@/api/transactionService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransactionCategoriesData } from "@/hooks/useTransactionCategoriesData";
import {
  TransactionCreate,
  TransactionFormState,
} from "@/types/transactionEntities";
import { formatCurrency } from "@/utils/currency/formatCurrency";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

interface TransactionFormProps {
  accountId: string;
  onSuccess?: () => void;
}
export default function TransactionForm({
  accountId,
  onSuccess,
}: TransactionFormProps) {
  const { transactionCategories, isLoading: isLoadingCategories } =
    useTransactionCategoriesData();

  const [formState, setFormState] = useState<TransactionFormState>({
    categoryId: "",
    amount: "",
    description: "",
  });

  const {
    mutateAsync: requestCreateTransaction,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (transactionData: TransactionCreate) =>
      createTransaction(transactionData),
    onSuccess: () => {
      if (onSuccess) onSuccess();
      setFormState({ categoryId: "", amount: "", description: "" });
    },
    onError: (err) => {
      toast.error(
        `Falha ao incluir transação: ${err.message || "Erro desconhecido"}`
      );
    },
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.categoryId || !formState.amount) return;

    const transactionData: TransactionCreate = {
      accountId,
      amount: parseFloat(formState.amount.replace(".", "").replace(",", ".")),
      description: formState.description,
      transactionDate: new Date().toISOString(),
      categoryId: formState.categoryId,
    };
    await requestCreateTransaction(transactionData);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value === "") {
      setFormState((prev) => ({ ...prev, amount: "" }));
      return;
    }
    setFormState((prev) => ({ ...prev, amount: formatCurrency(value) }));
  };
  const handleChange = (field: keyof TransactionFormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-xl bg-white p-4 shadow-md sm:p-6"
    >
      <h3 className="mb-6 text-base font-semibold text-[var(--color-text)] sm:text-lg">
        Nova Transação
      </h3>

      {isError && (
        <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
          Ocorreu um erro ao criar a transação. Por favor, tente novamente.
        </div>
      )}

      <div className="space-y-5 sm:space-y-6">
        <div className="w-full space-y-2">
          <Label
            htmlFor="transaction-category"
            className="text-sm text-[var(--color-text-secondary)]"
          >
            Tipo de Transação
          </Label>
          <Select
            value={formState.categoryId}
            onValueChange={(value) => handleChange("categoryId", value)}
            disabled={isLoadingCategories}
          >
            <SelectTrigger
              id="transaction-category"
              className="h-44 w-full border-[var(--outline)] bg-[var(--surface)] text-sm"
            >
              <SelectValue
                placeholder={
                  isLoadingCategories
                    ? "Carregando..."
                    : "Selecione o tipo de transação"
                }
              />
            </SelectTrigger>
            {transactionCategories && transactionCategories.length > 0 && (
              <SelectContent>
                {transactionCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            )}
          </Select>
        </div>

        <div className="w-full space-y-2">
          <Label
            htmlFor="transaction-value"
            className="text-sm text-[var(--color-text-secondary)]"
          >
            Valor
          </Label>
          <div className="relative">
            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-[var(--color-text-secondary)]">
              R$
            </span>
            <Input
              type="text"
              id="transaction-value"
              value={formState.amount}
              onChange={handleAmountChange}
              placeholder="0,00"
              className="h-11 border-[var(--outline)] bg-[var(--surface)] pl-8"
            />
          </div>
        </div>

        <div className="w-full space-y-2">
          <Label
            htmlFor="transaction-description"
            className="text-sm text-[var(--color-text-secondary)]"
          >
            Descrição
          </Label>
          <Input
            type="text"
            id="transaction-description"
            value={formState.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Ex: Pagamento de conta"
            className="h-11 border-[var(--outline)] bg-[var(--surface)]"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[var(--color-secondary)] text-[var(--color-on-secondary)] hover:bg-[var(--color-secondary-hover)]"
          size="lg"
          disabled={!formState.categoryId || !formState.amount || isPending}
        >
          {isPending ? "Processando..." : "Concluir Transação"}
        </Button>
      </div>
    </form>
  );
}
