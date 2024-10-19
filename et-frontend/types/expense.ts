export interface Expense {
  _id: string;
  amount: number;
  category: string;
  description: string;
  date: Date;
  userId?: string;
}

export interface NewExpense extends Omit<Expense, "id"> {}
