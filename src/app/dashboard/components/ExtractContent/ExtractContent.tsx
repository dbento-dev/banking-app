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
    <div className="px-6 pt-12">
      <div className="mb-4 flex flex-row items-center">
        <IconAvatar className="mr-4 size-[38px] stroke-current text-[var(--color-primary)]" />
        <h2 className="text-xl font-semibold">Joana da Silva Oliveira</h2>
      </div>

      <TransactionList transactions={sampleTransactions} />
    </div>
  );
}
