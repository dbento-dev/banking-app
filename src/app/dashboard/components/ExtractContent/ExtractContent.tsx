"use client";

import React from "react";

import TransactionList from "@/app/dashboard/components/TransactionList/TransactionList";
import { type Transaction } from "@/app/dashboard/components/TransactionList/TransactionList";

import IconAvatar from "@/assets/icons/icon-avatar.svg";

const sampleTransactions: Transaction[] = [
  {
    id: "1",
    description: "Transferência",
    amount: 36.0,
    type: "transfer",
    date: "04/01/2024",
  },
  {
    id: "2",
    description: "Transferência",
    amount: 56.0,
    type: "transfer",
    date: "03/08/2024",
  },
  {
    id: "3",
    description: "Depósito",
    amount: 120.0,
    type: "deposit",
    date: "20/07/2023",
  },
  {
    id: "4",
    description: "Transferência",
    amount: 36.0,
    type: "transfer",
    date: "15/06/2023",
  },
  {
    id: "5",
    description: "Depósito",
    amount: 40.0,
    type: "deposit",
    date: "10/06/2023",
  },
];

export default function ExtractContent() {
  return (
    <div className="flex h-full flex-col px-4 py-6 md:p-6">
      <div className="mb-6 flex flex-row items-center justify-between border-b border-[var(--color-border)] pb-4">
        <div className="flex items-center">
          <IconAvatar className="mr-4 size-[38px] stroke-current text-[var(--color-primary)]" />
          <div>
            <h2 className="text-xl font-semibold">Joana da Silva Oliveira</h2>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Conta Corrente
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <TransactionList transactions={sampleTransactions} />
      </div>
    </div>
  );
}
