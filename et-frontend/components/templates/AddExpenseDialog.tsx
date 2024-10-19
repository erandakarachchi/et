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
import { useState } from "react";
import { LoadingButton } from "../ui/loading-button";
import { DatePicker } from "./DatePicker";
import { Label } from "@radix-ui/react-label";
import { useCategories } from "@/lib/react-query/queries/useCategories";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useAPI } from "@/lib/providers/APIProvider";

type Props = {};

const AddExpenseDialog = (props: Props) => {
  const apiClient = useAPI();
  const { mutate: addExpense, isPending } = useAddExpenses();
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<Date>();

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!date) {
      return;
    }

    addExpense(
      {
        amount: parseInt(amount),
        description: description,
        category: category,
        date: date,
      },
      {
        onSuccess: () => {
          setDescription("");
          setAmount("");
          setCategory("");
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          <p>Add Expense</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
            <DialogDescription>Add a new expense to your account.</DialogDescription>
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
              <Label className="text-sm font-semibold" htmlFor="date">
                Category
              </Label>
              <Select onValueChange={handleCategoryChange}>
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
            <LoadingButton type="submit" className="h-10 w-1/2 mt-4" loading={isPending}>
              Save
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseDialog;
