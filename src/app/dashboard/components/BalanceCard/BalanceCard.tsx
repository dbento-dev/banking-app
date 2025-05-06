import React from "react";
import Image from "next/image";

import Logotipo from "@/assets/icons/icon-flagcard.png";
import IconCreditCard from "@/assets/icons/icon-creditcard.svg";
import IconEye from "@/assets/icons/icon-eye.svg";

interface BalanceCardProps {
  accountType: string;
  balance: number;
  currency?: string;
}

export default function BalanceCard({
  accountType,
  balance,
  currency = "BRL",
}: BalanceCardProps) {
  const formattedBalance = balance.toLocaleString("pt-BR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  });

  return (
    <div className="mt-8 flex h-[350px] w-[700px] flex-col justify-between rounded-xl bg-[var(--color-tertiary)] p-6 text-[var(--color-on-tertiary)]">
      <div className="flex flex-row items-center justify-between">
        <IconCreditCard className="mr-8 size-[38px] stroke-current" />
        <div className="flex flex-col items-end">
          <h4 className="text-sm font-bold">**** 1411</h4>
          <h6 className="text-xs">11/38</h6>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between">
        <Image src={Logotipo} alt="Bandeira do cartão" />
        <div className="flex flex-col items-center">
          <div className="w-full border-b border-white pb-1">
            <div className="flex flex-row items-center">
              <p className="mr-2 text-lg">{formattedBalance}</p>
              <IconEye className="size-5" />
            </div>
          </div>
          <h3 className="mt-1 text-sm">{accountType}</h3>
        </div>
      </div>
    </div>
  );
}
