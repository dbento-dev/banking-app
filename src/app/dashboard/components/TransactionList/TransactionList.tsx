import TransactionItem from "@/app/dashboard/components/TransactionItem/TransactionItem";
import { User } from "@/types/userEntities";
import { Transaction } from "@/types/transactionEntities";
import { WalletIcon } from "lucide-react";

interface TransactionListProps {
  user: User | null;
  transactions: Transaction[];
  onSetEditTransaction: (transaction: Transaction) => void;
}
export default function TransactionList({
  user,
  transactions,
  onSetEditTransaction,
}: TransactionListProps) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-center text-sm text-[var(--color-text-secondary)]">
          Nenhuma transação encontrada.
        </p>
      </div>
    );
  }
  const groupedTransactions = transactions.reduce(
    (acc, transaction) => {
      const date = new Date(transaction.transaction_date);
      const month = date.toLocaleString("pt-BR", { month: "long" });
      const key = month;
      if (!acc[key]) acc[key] = [];
      acc[key].push(transaction);
      return acc;
    },
    {} as Record<string, Transaction[]>
  );
  const sortedGroups = Object.entries(groupedTransactions).sort((a, b) => {
    const dateA = new Date(a[1][0].transaction_date);
    const dateB = new Date(b[1][0].transaction_date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="flex flex-col">
      <div className="mb-6 flex items-center">
        <WalletIcon className="mr-2 h-5 w-5 text-[var(--color-text)]" />
        <h4 className="text-xl font-semibold text-[var(--color-text)]">
          Extrato
        </h4>
      </div>
      <div className="flex-1">
        <div className="space-y-8 pr-2">
          {sortedGroups.map(([groupName, transactions], index) => (
            <div key={groupName}>
              <div className="mb-4">
                <span className="block text-sm font-semibold text-gray-700 capitalize">
                  {groupName}
                </span>
              </div>
              <ul className="w-full space-y-4 sm:min-w-sm">
                {transactions.map((transaction) => (
                  <TransactionItem
                    transaction={transaction}
                    user={user}
                    key={transaction.id}
                    onSetEditTransaction={onSetEditTransaction}
                  />
                ))}
              </ul>
              {index !== sortedGroups.length - 1 && (
                <div className="mt-8 mb-4 h-px bg-[#d8d8d8]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
