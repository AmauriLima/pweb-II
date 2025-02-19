
import { PrismaClient } from "@prisma/client";
import { Account } from "../entities/account";
import { AccountMapper } from "../mappers/account-mapper";
import { AccountRepository } from "./account-repository";

export class PrismaAccountRepository implements AccountRepository {
  constructor(
    private readonly prismaClient: PrismaClient
  ) {}

  async createAccount(account: Account): Promise<void> {
    await this.prismaClient.account.create({
      data: AccountMapper.toPersistence(account)
    });
  }

  async getAccounts(): Promise<Account[]> {
    const accounts = await this.prismaClient.account.findMany();

    return accounts.map(AccountMapper.toDomain);
  }
}
