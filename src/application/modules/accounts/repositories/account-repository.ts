import { Account } from "../entities/account";

export interface AccountsParams {
  cursor?: string;
  take?: number;
}

export interface GetAccountsResponse {
  accounts: Account[];
  nextCursor: string | null;
}

export interface AccountRepository {
  createAccount(account: Account): Promise<void>;
  getAccounts(params: AccountsParams): Promise<GetAccountsResponse>;
  getAccountById(accountId: string): Promise<Account | null>;
  getAccountByEmail(email: string): Promise<Account | null>;
  removeAccount(accountId: string): Promise<void>;
  updateAccount(account: Account): Promise<void>;
}
