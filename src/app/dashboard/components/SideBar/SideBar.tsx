"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import SideBarItem from "@/app/dashboard/components/SideBar/SideBarItem";

import Logotipo from "@/assets/logotipo.png";
import IconHome from "@/assets/icons/icon-home.svg";
import IconTransfer from "@/assets/icons/icon-transfer.svg";
import IconInvestments from "@/assets/icons/icon-investments.svg";
import IconServices from "@/assets/icons/icon-services.svg";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeSidebarItem = searchParams.get("section") || "inicio";

  useEffect(() => {
    setIsExpanded(window.innerWidth >= 1440);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      const toggleButton = document.getElementById("toggle-button");

      if (
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        toggleButton &&
        !toggleButton.contains(event.target as Node) &&
        window.innerWidth < 1440
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsSidebarOpen(false);
      }
      setIsExpanded(window.innerWidth >= 1440);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleItemClick = (itemId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("section", itemId);

    router.push(`?${params.toString()}`, { scroll: false });

    if (window.innerWidth < 640) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleExpanded = () => {
    if (window.innerWidth < 1440) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="relative">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <button
        id="toggle-button"
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 rounded-full bg-[var(--color-primary)] p-4 shadow-lg transition-colors duration-200 hover:bg-[var(--color-primary-hover)] sm:hidden"
        aria-label={isSidebarOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isSidebarOpen}
      >
        {isSidebarOpen ? (
          <XMarkIcon className="h-6 w-6 text-white" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-white" />
        )}
      </button>

      <div className="relative flex">
        <aside
          id="sidebar"
          className={`fixed top-0 left-0 z-40 flex h-[85vh] flex-col items-center overflow-y-auto rounded-r-2xl bg-[var(--surface)] p-5 text-[var(--foreground)] shadow-lg transition-all duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:relative sm:top-auto sm:left-auto sm:h-screen sm:translate-x-0 sm:rounded-2xl sm:shadow-none ${isExpanded ? "w-72" : "w-72 sm:w-20"} 2xl:w-72`}
          aria-label="Navegação principal"
        >
          <div className="relative flex w-full flex-col items-center">
            <Image
              src={Logotipo}
              className={`transition-all duration-200 hover:scale-105 ${isExpanded || window.innerWidth < 640 ? "w-[75%] pt-6 pb-12" : "w-12 py-6"} 2xl:w-[75%] 2xl:pt-6 2xl:pb-12`}
              alt="Bytebank Logotipo"
              priority
            />

            <nav
              className="flex w-full flex-col gap-4"
              aria-label="Menu principal"
            >
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <SideBarItem
                      IconComponent={item.IconComponent}
                      text={item.text}
                      isActive={activeSidebarItem === item.id}
                      onClick={() => handleItemClick(item.id)}
                      isCompact={!isExpanded && window.innerWidth >= 640}
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        <button
          onClick={toggleExpanded}
          className="sticky top-24 z-50 -ml-3 hidden h-6 w-6 items-center justify-center self-start rounded-full border border-[var(--color-border)] bg-[var(--color-primary)] p-1 text-white shadow-md transition-all duration-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary-hover)] sm:flex 2xl:hidden"
          aria-label={isExpanded ? "Recolher menu" : "Expandir menu"}
        >
          {isExpanded ? (
            <ChevronLeftIcon className="h-5 w-5" />
          ) : (
            <ChevronRightIcon className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
}
