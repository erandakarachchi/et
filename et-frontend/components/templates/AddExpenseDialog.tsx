"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import InputWithLabel from "./InputWithLabel";
import { useAddExpenses } from "@/lib/react-query/queries/useAddExpenses";
import { useEffect, useState } from "react";
import { LoadingButton } from "../ui/loading-button";
import { DatePicker } from "./DatePicker";
import { Label } from "@radix-ui/react-label";
import { useCategories } from "@/lib/react-query/queries/useCategories";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Expense } from "@/types/expense";
import { useEditExpense } from "@/lib/react-query/queries/useEditExpense";
import { useToast } from "@/hooks/use-toast";

type Props = {
  expense?: Expense;
  isEdit?: boolean;
  triggerButton?: React.ReactNode;
  triggerButtonText?: string;
};

const AddExpenseDialog = ({ expense, isEdit, triggerButton, triggerButtonText }: Props) => {
  const { mutate: addExpense, isPending } = useAddExpenses();
  const { mutate: editExpense, isPending: isEditPending } = useEditExpense();
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { toast } = useToast();
  const [description, setDescription] = useState(expense?.description || "");
  const [amount, setAmount] = useState(expense?.amount.toString() || "");
  const [category, setCategory] = useState(expense?.category || "");
  const [date, setDate] = useState<Date | undefined>(expense?.date ? new Date(expense.date) : undefined);

  useEffect(() => {
    if (!isCategoriesLoading && categories?.data && expense?.category) {
      const selectedCategory = categories.data.find((cat: any) => cat.name === expense.category);
      if (selectedCategory) {
        setCategory(selectedCategory.id);
      }
    }
  }, [isCategoriesLoading, categories, expense]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const resetValues = () => {
    setDescription("");
    setAmount("");
    setCategory("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const ifDateIsFuture = date && date > new Date();

    if (ifDateIsFuture) {
      toast({
        title: "Date is in the future",
        description: "Please select a date in the past.",
        variant: "destructive",
      });
      return;
    }

    if (!description || !amount || !category || !date) {
      toast({
        title: "All fields are required",
        description: "Please fill in all fields to add an expense.",
        variant: "destructive",
      });
      return;
    }

    if (isEdit && expense?.id) {
      editExpense(
        {
          expenseId: expense.id,
          expense: {
            amount: parseInt(amount),
            description: description,
            category: category,
            date: date,
          },
        },
        {
          onSuccess: () => {
            resetValues();
          },
        }
      );
    } else {
      addExpense(
        {
          amount: parseInt(amount),
          description: description,
          category: category,
          date: date,
        },
        {
          onSuccess: () => {
            resetValues();
          },
        }
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {triggerButton ? (
          triggerButton
        ) : (
          <Button>
            <PlusIcon />
            <p>{triggerButtonText || "Add Expense"}</p>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEdit ? "Edit Expense" : "Add Expense"}</DialogTitle>
            <DialogDescription>
              {isEdit ? "Edit the expense details below." : "Add a new expense to your account."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4 mt-4">
            <InputWithLabel
              id="description"
              value={description}
              label="Description"
              placeholder="Description"
              onChange={handleDescriptionChange}
            />
            <InputWithLabel
              id="amount"
              value={amount}
              label="Amount"
              placeholder="Amount"
              onChange={handleAmountChange}
            />
            <div className="grid gap-1">
              <Label className="text-sm font-semibold" htmlFor="category">
                Category
              </Label>
              <Select value={category} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full h-10">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.data?.map((category: any) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1">
              <Label className="text-sm font-semibold" htmlFor="date">
                Date
              </Label>
              <DatePicker selectedDate={date} setSelectedDate={setDate} />
            </div>
          </div>
          <DialogFooter>
            <LoadingButton type="submit" className="h-10 w-1/2 mt-4" loading={isPending || isEditPending}>
              Save
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseDialog;
