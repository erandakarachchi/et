"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  isOpen: boolean;
};

const SideBar = ({ isOpen }: Props) => {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col z-10 bg-background border-r border-border h-full fixed top-[65px] left-0 transition-all duration-300",
        "w-0 overflow-hidden md:w-64",
        isOpen && "w-64"
      )}
    >
      <div className="flex flex-col justify-between pt-8 gap-1">
        <Link href="/dashboard">
          <div
            className={`p-4 hover:bg-foreground hover:text-background cursor-pointer ${
              pathname === "/dashboard" ? "bg-foreground text-background font-bold" : ""
            }`}
          >
            <p className="text-md">Dashboard</p>
          </div>
        </Link>
        <Link href="/transactions">
          <div
            className={`p-4 hover:bg-foreground hover:text-background cursor-pointer ${
              pathname === "/transactions" ? "bg-foreground text-background font-bold" : ""
            }`}
          >
            <p className="text-md ">Expenses</p>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default SideBar;
