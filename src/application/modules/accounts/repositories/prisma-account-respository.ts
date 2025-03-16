
import { PrismaClient } from "@prisma/client";
import { Account } from "../entities/account";
import { AccountMapper } from "../mappers/account-mapper";
import { AccountRepository, AccountsParams, GetAccountsResponse } from "./account-repository";

export class PrismaAccountRepository implements AccountRepository {
  constructor(
    private readonly prismaClient: PrismaClient
  ) {}

  async updateAccount(account: Account): Promise<void> {
    await this.prismaClient.account.update({
      where: { id: account.id },
      data: AccountMapper.toPersistence(account)
    });
  }

  async getAccountById(accountId: string): Promise<Account | null> {
    const account = await this.prismaClient.account.findUnique({
      where: { id: accountId }
    });

    return account ? AccountMapper.toDomain(account) : null;
  }

  async removeAccount(accountId: string): Promise<void> {
    await this.prismaClient.account.delete({
      where: { id: accountId }
    })
  }

  async createAccount(account: Account): Promise<void> {
    await this.prismaClient.account.create({
      data: AccountMapper.toPersistence(account)
    });
  }

 async getAccounts({ cursor, take = 10 }: AccountsParams): Promise<GetAccountsResponse> {
    const accounts = await this.prismaClient.account.findMany({
      take: take + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = accounts[take]?.id ?? null;
    nextCursor && accounts.pop();

    return {
      accounts: accounts.map(AccountMapper.toDomain),
      nextCursor: nextCursor,
    };
  }


  async getAccountByEmail(email: string): Promise<Account | null> {
    const account = await this.prismaClient.account.findUnique({
      where: { email }
    });

    return account ? AccountMapper.toDomain(account) : null;
  }
}
