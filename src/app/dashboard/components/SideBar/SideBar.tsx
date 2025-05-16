"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import SideBarItem from "@/app/dashboard/components/SideBar/SideBarItem";

import Logotipo from "@/assets/logotipo.png";
import IconHome from "@/assets/icons/icon-home.svg";
import IconTransfer from "@/assets/icons/icon-transfer.svg";
import IconInvestments from "@/assets/icons/icon-investments.svg";
import IconServices from "@/assets/icons/icon-services.svg";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeSidebarItem = searchParams.get("section") || "inicio";

  const handleItemClick = (itemId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("section", itemId);

    router.push(`?${params.toString()}`, { scroll: false });

    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="md:hidden p-4 fixed top-4 left-4 z-50 bg-[var(--color-primary)] rounded-full shadow-md"
      >
        {isSidebarOpen ? (
          <XMarkIcon className="h-6 w-6 text-white" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-white" />
        )}
      </button>

      <aside
        // className="flex flex-col items-center bg-[var(--surface)] p-6 text-[var(--foreground)] w-full md:w-64 lg:w-80 h-screen overflow-y-auto rounded-xl">
        // className={`flex flex-col items-center bg-[var(--surface)] p-5 text-[var(--foreground)] md:w-64 lg:w-90 overflow-y-auto rounded-xl transition-all duration-300 ease-in-out ${isSidebarOpen ? "block" : "hidden"
        // className={`flex flex-col items-center bg-[var(--surface)] p-5 text-[var(--foreground)] md:w-64 lg:w-90 overflow-y-auto rounded-xl transition-all duration-300 ease-in-out ${isSidebarOpen ? "block" : "hidden"}`}
        className={`
          flex flex-col items-center bg-[var(--surface)] p-5 text-[var(--foreground)]
          overflow-y-auto shadow-lg md:shadow-none
          transition-transform duration-300 ease-in-out
          fixed top-0 left-0 h-full w-64 z-40 
          rounded-r-xl md:rounded-xl 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:w-64 lg:w-90 md:h-screen md:z-auto
        `}
      >
        <Image
          src={Logotipo}
          className="w-[75%] pt-6 pb-12"
          alt="Bytebank Logotipo"
        />

        <nav className="w-full flex flex-col gap-4">
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                <SideBarItem
                  IconComponent={item.IconComponent}
                  text={item.text}
                  isActive={activeSidebarItem === item.id}
                  onClick={() => handleItemClick(item.id)}
                  // className="transition-all duration-300 ease-in-out hover:bg-[var(--color-hover)] hover:text-[var(--color-on-primary)]"
                />
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
