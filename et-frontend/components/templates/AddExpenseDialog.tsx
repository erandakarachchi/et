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

type Props = {};

const AddExpenseDialog = (props: Props) => {
  const { mutate: addExpense, isPending } = useAddExpenses();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addExpense(
      {
        amount: parseInt(amount),
        description: description,
        category: category,
        date: new Date().toISOString(),
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
          <div className="grid gap-6 py-4">
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
            <InputWithLabel
              id="category"
              value={category}
              label="Category"
              placeholder="Category"
              onChange={handleCategoryChange}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseDialog;
