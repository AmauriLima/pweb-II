import { Account } from "../entities/account";
import { AccountRepository, AccountsParams, GetAccountsResponse } from "./account-repository";

export function makeAccountRepositoryTest(accountsParam: Account[] = []): AccountRepository {
  return new class TestAccountRepository implements AccountRepository {
    constructor(
      private accounts = accountsParam,
    ) {}

    async createAccount(account: Account): Promise<void> {
      this.accounts.push(account);
    }

    async getAccounts({ cursor, take = 10 }: AccountsParams): Promise<GetAccountsResponse> {
      const accountCursor = cursor ? this.accounts.filter((account) => account.id >= cursor) : this.accounts;
      const accounts = accountCursor.slice(0, take + 1);

      const nextCursor = accounts[take]?.id ?? null;
      nextCursor && accounts.pop();

      return {
        accounts,
        nextCursor,
      };
    }

    async getAccountById(accountId: string): Promise<Account | null> {
      return this.accounts.find((account) => account.id === accountId) ?? null;
    }

    async getAccountByEmail(email: string): Promise<Account | null> {
      return this.accounts.find((account) => account.email === email) ?? null;
    }

    async removeAccount(accountId: string): Promise<void> {
      this.accounts = this.accounts.filter((account) => account.id !== accountId);
    }

    async updateAccount(account: Account): Promise<void> {
      this.accounts = this.accounts.map((acc) => acc.id === account.id ? account : acc)
    }
  };
}
