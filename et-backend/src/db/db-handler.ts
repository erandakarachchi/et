import { IExpense } from "../types/expense";
import Expense from "../db/models/expense";
import User from "../db/models/user";
import connectToDatabase from "./config";
import { IUser } from "../types/user";

export const saveExpense = async (expense: IExpense) => {
  await connectToDatabase();
  const newExpense: IExpense = {
    amount: 30,
    description: "Transport",
    date: new Date(),
    category: "Food",
    userId: "123",
  };
  const e = new Expense(newExpense);
  await e.validate();
  const savedE = await e.save();
  return savedE;
};

export const saveUser = async (params: any) => {
  await connectToDatabase();
  const newUser: IUser = {
    email: "john.doe@example.com",
    name: "John Doe",
    maxMonthlyExpense: 1000,
  };
  const u = new User(newUser);
  await u.validate();
  const savedU = await u.save();
  return savedU;
};
