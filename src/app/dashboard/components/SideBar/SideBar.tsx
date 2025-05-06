"use client";

import React from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import SideBarItem from "@/app/dashboard/components/SideBar/SideBarItem";

import Logotipo from "@/assets/logotipo.png";
import IconHome from "@/assets/icons/icon-home.svg";
import IconTransfer from "@/assets/icons/icon-transfer.svg";
import IconInvestments from "@/assets/icons/icon-investments.svg";
import IconServices from "@/assets/icons/icon-services.svg";

const menuItems = [
  { id: "inicio", text: "Início", IconComponent: IconHome },
  {
    id: "transferencias",
    text: "Transferências",
    IconComponent: IconTransfer,
  },
  {
    id: "investimentos",
    text: "Investimentos",
    IconComponent: IconInvestments,
  },
  {
    id: "servicos",
    text: "Outros serviços",
    IconComponent: IconServices,
  },
];

export default function SideBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeSidebarItem = searchParams.get("section") || "inicio";

  const handleItemClick = (itemId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("section", itemId);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <aside className="flex h-[96vh] w-md flex-col items-center overflow-y-auto rounded-xl bg-[var(--surface)] p-6 text-[var(--foreground)]">
      <Image
        src={Logotipo}
        className="w-[75%] pt-6 pb-12"
        alt="Bytebank Logotipo"
      />

      <nav className="w-full">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <SideBarItem
                IconComponent={item.IconComponent}
                text={item.text}
                isActive={activeSidebarItem === item.id}
                onClick={() => handleItemClick(item.id)}
              />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
