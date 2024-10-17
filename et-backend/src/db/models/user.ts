import mongoose, { Schema } from "mongoose";
import { IUser } from "../../types/user";

const User = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  maxMonthlyExpense: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<IUser>("User", User);
