import { Account } from "../entities/account";

export interface AccountRepository {
  createAccount(account: Account): Promise<void>;
  getAccounts(): Promise<Account[]>;
  getAccountById(accountId: string): Promise<Account | null>;
  getAccountByEmail(email: string): Promise<Account | null>;
  removeAccount(accountId: string): Promise<void>;
}
