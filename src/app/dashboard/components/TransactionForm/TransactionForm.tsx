"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type TransactionType = "transfer" | "deposit" | "payment" | "";

export default function TransactionForm() {
  const [transactionType, setTransactionType] = useState<TransactionType>("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionType || !amount) return;

    setIsSubmitting(true);
    try {
      // Simulando uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Transação:", {
        type: transactionType,
        amount: parseFloat(amount),
      });

      // Limpar formulário após sucesso
      setTransactionType("");
      setAmount("");
    } catch (error) {
      console.error("Erro ao processar transação:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const floatValue = parseFloat(numericValue) / 100;
    return floatValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value === "") {
      setAmount("");
      return;
    }
    setAmount(formatCurrency(value).replace("R$", "").trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-xl bg-white p-4 sm:p-6 shadow-md"
    >
      <h3 className="mb-6 text-base sm:text-lg font-semibold text-[var(--color-text)]">
        Nova Transação
      </h3>

      <div className="space-y-5 sm:space-y-6">
        <div className="w-full space-y-2">
          <Label
            htmlFor="transaction-type"
            className="text-sm text-[var(--color-text-secondary)]"
          >
            Tipo de Transação
          </Label>
          <Select
            value={transactionType}
            onValueChange={(value) =>
              setTransactionType(value as TransactionType)
            }
          >
            <SelectTrigger
              id="transaction-type"
              className="w-full bg-[var(--surface)] border-[var(--outline)] h-11"
            >
              <SelectValue placeholder="Selecione o tipo de transação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="transfer">Transferência</SelectItem>
              <SelectItem value="deposit">Depósito</SelectItem>
              <SelectItem value="payment">Pagamento</SelectItem>
            </SelectContent>
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
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]">
              R$
            </span>
            <Input
              type="text"
              id="transaction-value"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0,00"
              className="bg-[var(--surface)] border-[var(--outline)] pl-8 h-11"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] text-[var(--color-on-secondary)]"
          size="lg"
          disabled={!transactionType || !amount || isSubmitting}
        >
          {isSubmitting ? "Processando..." : "Concluir Transação"}
        </Button>
      </div>
    </form>
  );
}
