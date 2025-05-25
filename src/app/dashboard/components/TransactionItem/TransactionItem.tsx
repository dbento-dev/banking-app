"use client";
import IconArrowPositive from "@/assets/icons/icon-arrow-negative.svg";
import IconArrowNegative from "@/assets/icons/icon-arrow-positive.svg";
import { Transaction } from "@/types/transactionEntities";
import { formatDisplayDateWithYear } from "@/utils/date/formatDisplayDate";

interface TransactionItemProps {
  transaction: Transaction;
}
export default function TransactionItem({ transaction }: TransactionItemProps) {
  return (
    <li
      key={transaction.id}
      className={`flex items-center justify-between rounded-lg p-3 transition-colors ${
        transaction.category_name === "Entrada"
          ? "hover:bg-green-50"
          : "hover:bg-red-50"
      }`}
    >
      <div className="flex items-center gap-3">
        {transaction.category_name === "Entrada" ? (
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
            {transaction.description || transaction.category_name}
          </span>
          <span className="text-xs text-gray-500">
            {formatDisplayDateWithYear(transaction.transaction_date)}
          </span>
        </div>
      </div>

      <span
        className={`text-sm font-semibold ${
          transaction.category_name === "Entrada"
            ? "text-[#14AE5C]"
            : "text-[#ED4A4C]"
        }`}
      >
        {transaction.category_name === "Entrada" ? "+" : "-"} R${" "}
        {transaction.amount.replace(".", ",")}
      </span>
    </li>
  );
}
