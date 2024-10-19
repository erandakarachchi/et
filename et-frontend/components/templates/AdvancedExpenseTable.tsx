"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Expense } from "@/types/expense";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { DataTable } from "./DataTable";
import { useExpenses } from "@/lib/react-query/queries/useExpenses";
import { Skeleton } from "@/components/ui/skeleton";
import ConfirmationDialog from "./ConfirmationDialog";
import { useDeleteExpense } from "@/lib/react-query/queries/useDeleteExpense";

type Props = {};

const AdvancedExpenseTable = (props: Props) => {
  const { data, isLoading } = useExpenses();
  const { mutate: deleteExpense, isPending: isDeleting } = useDeleteExpense();

  const handleDeleteClick = (row: Expense) => {
    if (row.id) {
      deleteExpense(row.id);
    }
  };

  const handleEditClick = (row: Expense) => {
    console.log("Row ", row);
  };

  const columns: ColumnDef<Expense>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"));
        const formattedDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return <div>{formattedDate}</div>;
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const deleteIcon = <Trash2 className="cursor-pointer w-4 h-4" />;
        const title = `Delete expense`;
        const description = `Are you sure you want to delete this expense? This action cannot be undone.`;
        return (
          <div className="flex gap-4">
            <Pencil className="cursor-pointer w-4 h-4" onClick={() => handleEditClick(row.original)} />
            <ConfirmationDialog
              title={title}
              description={description}
              onConfirm={() => handleDeleteClick(row.original)}
              trigger={deleteIcon}
              confirmButtonText="Delete"
            />
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return <Skeleton className="w-full h-[500px]" />;
  }

  const hasData = data?.data && data?.data.length;

  return <div>{hasData ? <DataTable columns={columns} data={data.data} /> : <div>No data</div>}</div>;
};

export default AdvancedExpenseTable;
