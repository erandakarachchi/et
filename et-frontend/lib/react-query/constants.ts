// export const API_ENDPOINTS = {
//   ADD_EXPENSE: '/api/expenses/add',
//   UPDATE_EXPENSE: '/api/expenses/update',
//   DELETE_EXPENSE: '/api/expenses/delete',
//   GET_ALL_EXPENSES: '/api/expenses/all',
// } as const;

// export const QUERY_KEYS = {
//   EXPENSES: 'expenses',
//   USER_PROFILE: 'userProfile',
// } as const;

// export enum ErrorMessages {
//   NETWORK_ERROR = 'Network error. Please try again.',
//   UNAUTHORIZED = 'You are not authorized to perform this action.',
//   INVALID_INPUT = 'Invalid input. Please check your data and try again.',
// }

// export const EXPENSE_CATEGORIES = [
//   'Food',
//   'Transportation',
//   'Entertainment',
//   'Utilities',
//   'Other',
// ] as const;

export const QUERY_KEYS = {
  EXPENSES: "expenses",
  USER: "user",
  CATEGORIES: "categories",
  STATISTICS: "statistics",
} as const;
