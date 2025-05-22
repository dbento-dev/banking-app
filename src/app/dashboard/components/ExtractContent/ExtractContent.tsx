"use client";

import TransactionList from "@/app/dashboard/components/TransactionList/TransactionList";
import IconAvatar from "@/assets/icons/icon-avatar.svg";
import { useTransactionData } from "@/hooks/useTransactionsData";
import { Account } from "@/types/accountEntities";
import { User } from "@/types/userEntities";

interface ExtractContentProps {
  user: User | null;
  account: Account | null;
}
export default function ExtractContent({ account, user }: ExtractContentProps) {
  const { transactions } = useTransactionData(account?.id);

  if (!user || !account) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-center text-sm text-[var(--color-text-secondary)]">
          Carregando informações...
        </p>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col px-4 py-6 md:p-6">
      <div className="mb-6 flex flex-row items-center justify-between border-b border-[var(--color-border)] pb-4">
        <div className="flex items-center">
          <IconAvatar className="mr-4 size-[38px] stroke-current text-[var(--color-primary)]" />
          <div>
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {account?.account_type}
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <TransactionList transactions={transactions || []} />
      </div>
    </div>
  );
}
