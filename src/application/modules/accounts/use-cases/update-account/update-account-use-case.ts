import { ConflictHTTPError } from "@/application/shared/http/errors/conflict-http-error";
import { InternalServerHTTPError } from "@/application/shared/http/errors/internal-server-http-error";
import { NotFoundHTTPError } from "@/application/shared/http/errors/not-found-http-error";
import { IUseCase } from "@/application/shared/http/interfaces/use-case";
import { ACCOUNT_NOT_FOUND_ERROR, UPDATE_ACCOUNT_CONFLICT_ERROR, UPDATE_ACCOUNT_ERROR } from "../../docs/update-account-swagger";
import { Account } from "../../entities/account";
import { AccountRepository } from "../../repositories/account-repository";
import { UpdateAccountSchema } from "./update-account-dto";

type IInput = UpdateAccountSchema & {
  accountId: string;
};

interface IOutput {
  updatedAccount: Account;
}


export class UpdateAccountUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly accountRepo: AccountRepository,
  ) {}

  async execute({ accountId, ...input }: IInput): Promise<IOutput> {
    const account = await this.accountRepo.getAccountById(accountId);

    if (!account) {
      throw new NotFoundHTTPError(ACCOUNT_NOT_FOUND_ERROR);
    }

    if (input.email) {
      const accountByEmail = await this.accountRepo.getAccountByEmail(input.email);

      if (accountByEmail && accountByEmail.id !== accountId) {
        throw new ConflictHTTPError(UPDATE_ACCOUNT_CONFLICT_ERROR);
      }
    }

    const updatedAccount = new Account({
      id: account.id,
      name: input.name || account.name,
      email: input.email || account.email,
      password: input.password || account.password,
      createdAt: account.createdAt,
    });

    try {
      await this.accountRepo.updateAccount(updatedAccount);

      return { updatedAccount };
    } catch {
      throw new InternalServerHTTPError(UPDATE_ACCOUNT_ERROR);
    }
  }
}
