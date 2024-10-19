import mongoose, { Schema } from "mongoose";
import { IUser } from "../../types/user";

const User = new Schema<IUser>({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  maxMonthlyExpenseLimit: {
    type: Number,
    required: true,
  },
  categories: {
    type: [Object],
    required: true,
  },
});

export default mongoose.model<IUser>("User", User);
