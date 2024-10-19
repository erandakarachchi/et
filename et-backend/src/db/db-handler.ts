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

export const viewAllExpenses = async (userId: string) => {
  await connectToDatabase();
  const expenses = await Expense.find({ userId });
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
