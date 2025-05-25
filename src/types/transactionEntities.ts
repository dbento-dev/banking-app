export interface Transaction {
  id: string;
  account_id: string;
  amount: string;
  description: string;
  transaction_date: string;
  category_id: string;
  category_name: TransactionCategoryName;
}
export type TransactionCategoryName = "Entrada" | "Saída";
