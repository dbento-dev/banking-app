import React from "react";
import IconArrowPositive from "@/assets/icons/icon-arrow-positive.svg";
import IconArrowNegative from "@/assets/icons/icon-arrow-negative.svg";

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
    <div className="py-4">
      <h4 className="mb-3 text-xl font-semibold text-[var(--color-text-secondary)]">
        Extrato
      </h4>

      <h6 className="mb-3 text-xs font-semibold text-[#8B8B8B]">Setembro</h6>

      <ul className="list-none space-y-3">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className="flex items-center justify-between border-b border-[#8B8B8B] pb-3"
          >
            <div className="flex flex-row items-center gap-3">
              {transaction.type === "deposit" ? (
                <div className="flex h-10 w-10 items-center justify-center rounded-[100%] bg-[#81FCAE] text-[#14AE5C]">
                  <IconArrowPositive className="size-[12px] stroke-current" />
                </div>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-[100%] bg-[#FFA2A2] text-[#ED4A4C]">
                  <IconArrowNegative className="size-[12px] stroke-current" />
                </div>
              )}

              <div className="flex flex-col">
                <span className="text-sm text-[#8B8B8B]">
                  {transaction.date}
                </span>

                <span className="text-sm text-[var(--color-text)]">
                  {transaction.description}
                </span>

                <span className="text-sm font-semibold">
                  {transaction.type === "deposit" ? "" : "-"} R${" "}
                  {transaction.amount.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
