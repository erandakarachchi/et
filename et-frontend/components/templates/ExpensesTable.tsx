"use client";

import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useExpenses } from "@/lib/react-query/queries/useExpenses";

type Props = {};

const ExpensesTable = (props: Props) => {
  const { data: expenses, isLoading, isError } = useExpenses();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="border rounded-md p-4 border-border">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.data?.map((expense: any) => (
            <TableRow key={expense._id}>
              <TableCell className="font-medium">{expense.description}</TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpensesTable;
