"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Expense } from "@/types/expense";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { DataTable } from "./DataTable";
import { ExpenseFilter, useExpenses } from "@/lib/react-query/queries/useExpenses";
import { Skeleton } from "@/components/ui/skeleton";
import ConfirmationDialog from "./ConfirmationDialog";
import { useDeleteExpense } from "@/lib/react-query/queries/useDeleteExpense";
import AddExpenseDialog from "./AddExpenseDialog";
import { Select, SelectItem, SelectValue, SelectContent, SelectTrigger } from "../ui/select";
import { DatePicker } from "./DatePicker";
import { useMemo, useState } from "react";
import { useCategories } from "@/lib/react-query/queries/useCategories";

type Props = {};

const AdvancedExpenseTable = (props: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>("");

  const filter: ExpenseFilter = useMemo(
    () => ({
      categoryId: selectedCategory,
      date: selectedDate?.toISOString(),
    }),
    [selectedCategory, selectedDate]
  );
  const { data, isLoading } = useExpenses(filter);
  const { mutate: deleteExpense, isPending: isDeleting } = useDeleteExpense();

  const { data: categories, isLoading: isCategoriesLoading } = useCategories();

  const handleDeleteClick = (row: Expense) => {
    if (row.id) {
      deleteExpense(row.id);
    }
  };

  const filterByCategory = (category: string) => {
    console.log(category);
    setSelectedCategory(category);
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
            <AddExpenseDialog
              isEdit
              expense={row.original}
              triggerButton={<Pencil className="cursor-pointer w-4 h-4" />}
            />
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

  return (
    <div>
      <div className="flex w-full justify-end gap-3 items-center ">
        <div>
          {isCategoriesLoading ? (
            <Skeleton className="w-24 h-8" />
          ) : (
            <Select onValueChange={(value) => filterByCategory(value)} value={selectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="all" value="all">
                  All
                </SelectItem>
                {categories?.data.map((category: any) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        {/* <div className="">
          <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div> */}
      </div>
      <div className="mt-4">
        {hasData ? (
          <DataTable columns={columns} data={data.data} />
        ) : (
          <div className="flex justify-center items-center h-[500px]">No expenses found</div>
        )}
      </div>
    </div>
  );
};

export default AdvancedExpenseTable;
