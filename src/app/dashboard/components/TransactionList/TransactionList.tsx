import React from "react";
import IconArrowPositive from "@/assets/icons/icon-arrow-negative.svg";
import IconArrowNegative from "@/assets/icons/icon-arrow-positive.svg";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "deposit" | "transfer" | "payment";
  date: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({
  transactions,
}: TransactionListProps) {
  return (
    <div className="flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-xl font-semibold text-[var(--color-text)]">
          Extrato
        </h4>
        <button className="cursor-pointer text-sm text-[var(--color-secondary)] hover:underline">
          Ver tudo
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h6 className="mb-4 flex items-center text-sm font-medium text-[var(--color-text-secondary)]">
            <span className="mr-3 font-semibold text-gray-700">Hoje</span>
            <div className="h-[1px] flex-1 bg-[var(--color-border)]" />
          </h6>

          <ul className="space-y-4">
            {transactions.slice(0, 2).map((transaction) => (
              <li
                key={transaction.id}
                className={`flex items-center justify-between rounded-lg p-3 transition-colors ${
                  transaction.type === "deposit"
                    ? "hover:bg-green-50"
                    : "hover:bg-red-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  {transaction.type === "deposit" ? (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8FFF3] text-[#14AE5C]">
                      <IconArrowPositive className="size-[14px] stroke-current" />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFE8E8] text-[#ED4A4C]">
                      <IconArrowNegative className="size-[14px] stroke-current" />
                    </div>
                  )}

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">
                      {transaction.description}
                    </span>
                    <span className="text-xs text-gray-500">
                      {transaction.date}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-sm font-semibold ${
                    transaction.type === "deposit"
                      ? "text-[#14AE5C]"
                      : "text-[#ED4A4C]"
                  }`}
                >
                  {transaction.type === "deposit" ? "+" : "-"} R${" "}
                  {transaction.amount.toFixed(2).replace(".", ",")}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h6 className="mb-4 flex items-center text-sm font-medium text-[var(--color-text-secondary)]">
            <span className="mr-3 font-semibold text-gray-700">Anteriores</span>
            <div className="h-[1px] flex-1 bg-[var(--color-border)]" />
          </h6>

          <ul className="space-y-4">
            {transactions.slice(2).map((transaction) => (
              <li
                key={transaction.id}
                className={`flex items-center justify-between rounded-lg p-3 transition-colors ${
                  transaction.type === "deposit"
                    ? "hover:bg-green-50"
                    : "hover:bg-red-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  {transaction.type === "deposit" ? (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8FFF3] text-[#14AE5C]">
                      <IconArrowPositive className="size-[14px] stroke-current" />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFE8E8] text-[#ED4A4C]">
                      <IconArrowNegative className="size-[14px] stroke-current" />
                    </div>
                  )}

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-[var(--color-text)]">
                      {transaction.description}
                    </span>
                    <span className="text-xs text-[var(--color-text-secondary)]">
                      {transaction.date}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-sm font-semibold ${
                    transaction.type === "deposit"
                      ? "text-[#14AE5C]"
                      : "text-[#ED4A4C]"
                  }`}
                >
                  {transaction.type === "deposit" ? "+" : "-"} R${" "}
                  {transaction.amount.toFixed(2).replace(".", ",")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
