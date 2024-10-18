export interface ICategory {
  id: string;
  name: string;
}

export interface IUser {
  email: string;
  name: string;
  maxMonthlyExpenseLimit: number;
  categories?: ICategory[];
}

export interface IUserWithId extends IUser {
  id: string;
}
