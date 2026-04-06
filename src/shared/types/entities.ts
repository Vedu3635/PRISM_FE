export interface UserEntity {
  id?: string;
  name?: string;
  full_name?: string;
  username?: string;
  email?: string;
}

export interface TransactionEntity {
  id?: string;
  amount: number;
  category?: string;
  type?: 'income' | 'expense';
  created_at?: string;
}

export interface GoalEntity {
  id?: string;
  name: string;
  target_amount?: number;
  progress_amount?: number;
}

export interface BudgetEntity {
  id?: string;
  category?: string;
  limit_amount?: number;
  spent_amount?: number;
}

export interface GroupEntity {
  id?: string;
  name: string;
  members_count?: number;
}

