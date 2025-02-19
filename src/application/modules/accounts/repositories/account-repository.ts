import { Account } from "../entities/account";

export interface AccountRepository {
  createAccount(account: Account): Promise<void>;
  getAccounts(): Promise<Account[]>;
  getAccountByEmail(email: string): Promise<Account | null>;
}
