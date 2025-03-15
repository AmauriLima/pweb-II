import { IUseCase } from "@/application/shared/http/interfaces/use-case";
import { Account } from "../../entities/account";
import { AccountRepository } from "../../repositories/account-repository";

interface Input {
  cursor?: string | null;
  take?: number;
};

interface Output {
  accounts: Account[];
  nextCursor: string | null;
};

export class GetAccountsUseCase implements IUseCase<Input, Output> {
  constructor(
    private readonly accountRepo: AccountRepository,
  ) {}

  async execute({ cursor, take }: Input): Promise<Output> {
    const { accounts, nextCursor } = cursor === null
      ? { accounts: [], nextCursor: null }
      : await this.accountRepo.getAccounts({ cursor, take });

    return {
      accounts,
      nextCursor,
    }
  }
}
