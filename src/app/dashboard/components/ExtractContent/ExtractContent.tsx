"use client";

import TransactionList from "@/app/dashboard/components/TransactionList/TransactionList";
import IconAvatar from "@/assets/icons/icon-avatar.svg";
import { Account } from "@/types/accountEntities";
import { Transaction } from "@/types/transactionEntities";
import { User } from "@/types/userEntities";
import Image from "next/image";

interface ExtractContentProps {
  user: User | null;
  account: Account | null;
  transactions: Transaction[] | null;
}
export default function ExtractContent({
  account,
  user,
  transactions,
}: ExtractContentProps) {
  if (!user || !account || !transactions) {
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
          {user.avatar_url ? (
            <Image
              src={user.avatar_url}
              alt={user.name}
              width={44}
              height={44}
              className="mr-3 aspect-1/1 rounded-full object-cover"
              unoptimized={true}
            />
          ) : (
            <IconAvatar className="mr-3 size-[44px] stroke-current text-[var(--color-primary)]" />
          )}
          <div>
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {account?.account_type}
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <TransactionList
          user={user || null}
          transactions={transactions || []}
        />
      </div>
    </div>
  );
}
