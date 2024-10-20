import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "LKR" }).format(amount);
}

export function formatPercentage(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 2 }).format(amount);
}
