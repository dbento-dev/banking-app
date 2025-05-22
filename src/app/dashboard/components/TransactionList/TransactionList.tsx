import TransactionItem from "@/app/dashboard/components/TransactionItem";
import { Transaction } from "@/types/transactionEntities";

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({
  transactions,
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

  // TEMP
  transactions.map((tr) => {
    if (tr.category_name === "Depósito") {
      tr.category_name = "deposit";
    } else if (tr.category_name === "Transferência") {
      tr.category_name = "transfer";
    } else if (tr.category_name === "Pagamento") {
      tr.category_name = "payment";
    }
  });
  const todayTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.transaction_date);
    const today = new Date();
    return (
      transactionDate.toISOString().split("T")[0] ===
      today.toISOString().split("T")[0]
    );
  });
  const previousTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.transaction_date);
    const today = new Date();
    return (
      transactionDate.toISOString().split("T")[0] !==
      today.toISOString().split("T")[0]
    );
  });

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
        {todayTransactions.length > 0 && (
          <div>
            <h6 className="mb-4 flex items-center text-sm font-medium text-[var(--color-text-secondary)]">
              <span className="mr-3 font-semibold text-gray-700">Hoje</span>
              <div className="h-[1px] flex-1 bg-[var(--color-border)]" />
            </h6>
            <ul className="space-y-4">
              {todayTransactions.map((transaction) => (
                <TransactionItem
                  transaction={transaction}
                  key={transaction.id}
                />
              ))}
            </ul>
          </div>
        )}
        {previousTransactions.length > 0 && (
          <div>
            <h6 className="mb-4 flex items-center text-sm font-medium text-[var(--color-text-secondary)]">
              <span className="mr-3 font-semibold text-gray-700">
                Anteriores
              </span>
              <div className="h-[1px] flex-1 bg-[var(--color-border)]" />
            </h6>
            <ul className="space-y-4">
              {previousTransactions.map((transaction) => (
                <TransactionItem
                  transaction={transaction}
                  key={transaction.id}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
