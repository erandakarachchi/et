import { IExpense } from "../types/expense";
import Expense from "../db/models/expense";
import User from "../db/models/user";
import connectToDatabase from "./config";
import { IUser, IUserWithId } from "../types/user";
import { DEFAULT_CATEGORIES } from "../utils/constants";
import { generateUUID } from "../utils/utils";

export const createExpense = async (newExpense: IExpense) => {
  await connectToDatabase();
  const expense = new Expense(newExpense);
  const savedExpense = await expense.save();
  return savedExpense;
};

export const createUser = async (newUser: IUser) => {
  await connectToDatabase();
  const user: IUserWithId = {
    id: generateUUID(),
    clerkId: newUser.clerkId,
    email: newUser.email,
    name: newUser.name,
    maxMonthlyExpenseLimit: newUser.maxMonthlyExpenseLimit,
    categories: [...DEFAULT_CATEGORIES],
  };
  const u = new User(user);
  await u.validate();
  const savedU = await u.save();
  return savedU;
};

export const viewAllExpenses = async (userId: string, filter: any) => {
  await connectToDatabase();
  const query: any = { userId };

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

  if (filter && filter.categoryId) {
    query.category = filter.categoryId;
  }

  // Filtering the data only for the current month
  query.date = {
    $gte: startOfMonth,
    $lte: endOfMonth,
  };

  const expenses = await Expense.find(query);
  return expenses;
};

export const getUserById = async (id: string) => {
  await connectToDatabase();
  const user = await User.findById(id);
  return user;
};

export const getUserByClerkId = async (clerkId: string) => {
  await connectToDatabase();
  const user = await User.findOne({ clerkId });
  return user;
};

export const deleteExpenseById = async (expenseId: string) => {
  await connectToDatabase();
  const deleted = await Expense.findByIdAndDelete(expenseId);
  return deleted;
};

export const updateExpense = async (expenseId: string, expense: IExpense) => {
  await connectToDatabase();
  const updated = await Expense.findByIdAndUpdate(expenseId, expense);
  return updated;
};
