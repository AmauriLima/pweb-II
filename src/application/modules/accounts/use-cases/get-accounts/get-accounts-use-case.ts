import { IUseCase } from "@/application/shared/http/interfaces/use-case";
import { Account } from "../../entities/account";
import { AccountRepository } from "../../repositories/account-repository";

interface Input {
  page?: number;
  perPage?: number;
};

interface Output {
  accounts: Account[];
  totalAccounts: number;
};

export class GetAccountsUseCase implements IUseCase<Input, Output> {
  constructor(
    private readonly accountRepo: AccountRepository,
  ) {}

  async execute({ page, perPage }: Input): Promise<Output> {
    const { accounts, totalAccounts } = await this.accountRepo.getAccounts({ page, perPage });

    return {
      accounts,
      totalAccounts,
    }
  }
}
