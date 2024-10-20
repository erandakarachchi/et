"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {};

const SideBar = (props: Props) => {
  const pathname = usePathname();

  return (
    <aside className="w-0 overflow-hidden md:w-64 bg-background border-r border-border h-full fixed top-[65px] left-0 transition-all duration-300">
      <div className="flex flex-col justify-between pt-8">
        <Link href="/dashboard">
          <div
            className={`p-4 hover:bg-accent cursor-pointer ${pathname === "/dashboard" ? "bg-accent font-bold" : ""}`}
          >
            <p className="text-md">Dashboard</p>
          </div>
        </Link>
        <Link href="/transactions">
          <div
            className={`p-4 hover:bg-accent cursor-pointer ${
              pathname === "/transactions" ? "bg-accent font-bold" : ""
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
