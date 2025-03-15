import { Account } from "../entities/account";
import { AccountRepository } from "./account-repository";

export function makeAccountRepositoryTest(accountsParam: Account[] = []): AccountRepository {
  return new class TestAccountRepository implements AccountRepository {
    constructor(
      private readonly accounts = accountsParam,
    ) {}

    async createAccount(account: Account): Promise<void> {
      this.accounts.push(account);
    }

    async getAccounts(): Promise<Account[]> {
      return this.accounts;
    }

    async getAccountById(accountId: string): Promise<Account | null> {
      return this.accounts.find((account) => account.id === accountId) ?? null;
    }

    async getAccountByEmail(email: string): Promise<Account | null> {
      return this.accounts.find((account) => account.email === email) ?? null;
    }

    async removeAccount(accountId: string): Promise<void> {
      this.accounts.filter((account) => account.id === accountId);
    }

    async updateAccount(account: Account): Promise<void> {
      this.accounts.map((acc) => acc.id === account.id ? account : acc)
    }
  };
}
