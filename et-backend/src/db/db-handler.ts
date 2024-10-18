import { IExpense } from "../types/expense";
import Expense from "../db/models/expense";
import User from "../db/models/user";
import connectToDatabase from "./config";
import { IUser } from "../types/user";

export const createExpense = async (newExpense: IExpense) => {
  await connectToDatabase();
  const expense = new Expense(newExpense);
  // await expense.validate();
  const savedExpense = await expense.save();
  return savedExpense;
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

export const viewAllExpenses = async () => {
  await connectToDatabase();
  const expenses = await Expense.find();
  return expenses;
};
