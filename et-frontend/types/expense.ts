export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: Date;
}

export interface NewExpense extends Omit<Expense, "id"> {}
