import mongoose, { Schema } from "mongoose";
import { IExpense } from "../../types/expense";

const Expense = new Schema<IExpense>({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IExpense>("Expense", Expense);
