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
    <div className="w-[60%] h-[40%] mt-8 flex flex-col justify-between rounded-xl bg-[var(--color-tertiary)] text-[var(--color-on-tertiary)] px-4 sm:px-6 py-6 sm:py-8 ">
      <div className="flex items-center justify-between">
        <IconCreditCard className="size-8 size-[38px] stroke-current object-contain" />
        <div className="flex flex-col items-end text-xs sm:text-sm">
          <h4 className="font-bold">**** 1411</h4>
          <h6>11/38</h6>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
        {/* <Image src={Logotipo} alt="Bandeira do cartão" className="w-16 sm:w-auto" /> */}
        < Image src={Logotipo} alt="Bandeira do cartão" className="object-contain" />
        <div className="flex flex-col items-center text-sm sm:text-base">
          <div className="w-full border-b border-white pb-1">
            <div className="flex items-center">
              <p className="mr-2 truncate max-w-[160px] sm:max-w-none">{formattedBalance}</p>
              <IconEye className="size-5" />
            </div>
          </div>
          <h3 className="mt-1">{accountType}</h3>
        </div>
      </div>
    </div>
  );
}
