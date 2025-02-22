import { ConflictHTTPError } from "@/application/shared/http/errors/conflict-http-error";
import { InternalServerHTTPError } from "@/application/shared/http/errors/internal-server-http-error";
import { IUseCase } from "@/application/shared/http/interfaces/use-case";
import { CREATE_ACCOUNT_CONFLICT_ERROR, CREATE_ACCOUNT_ERROR } from "../../docs/create-account-swagger";
import { Account } from "../../entities/account";
import { AccountRepository } from "../../repositories/account-repository";
import { CreateAccountSchema } from "./create-account-dto";

type IInput = CreateAccountSchema;
interface IOutput {
  account: Account;
};

export class CreateAccountUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly accountRepo: AccountRepository,
  ) {}

  async execute({ email, name, password }: IInput): Promise<IOutput> {
    const accountAlreadyExists = await this.accountRepo.getAccountByEmail(email);

    if (accountAlreadyExists) {
      throw new ConflictHTTPError(CREATE_ACCOUNT_CONFLICT_ERROR);
    }

    const account = new Account({
      name,
      email,
      password,
    });

    try {
      await this.accountRepo.createAccount(account);

      return {
        account,
      }
    } catch {
      throw new InternalServerHTTPError(CREATE_ACCOUNT_ERROR);
    }

  }
}
