"use client";

import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useExpenses } from "@/lib/react-query/queries/useExpenses";

export type TotalExpensesPerCategory = {
  name: string;
  totalExpenses: number;
};

type Props = {
  totalExpensesPerCategory: TotalExpensesPerCategory[];
  isLoading: boolean;
};

const ExpensesTable = ({ totalExpensesPerCategory, isLoading }: Props) => {
  console.log("totalExpensesPerCategory", totalExpensesPerCategory);

  if (isLoading) {
    return (
      <div className="border rounded-md p-4 border-border flex justify-center items-center">
        <h3>Loading...</h3>
      </div>
    );
  }

  const hasData = totalExpensesPerCategory && totalExpensesPerCategory.length;

  return (
    <div className="border rounded-md p-4 border-border">
      <Table>
        <TableCaption>A list of your recent expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-md">Category</TableHead>
            <TableHead className="font-bold text-md text-center">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hasData ? (
            totalExpensesPerCategory.map((expense: TotalExpensesPerCategory) => (
              <TableRow key={expense.name}>
                <TableCell className="font-medium">{expense.name}</TableCell>
                <TableCell className="text-center">{expense.totalExpenses}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} className="text-center">
                No expenses found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpensesTable;
