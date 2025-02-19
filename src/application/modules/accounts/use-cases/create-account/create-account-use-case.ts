import { IUseCase } from "@/application/shared/http/interfaces/use-case";
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
    const account = new Account({
      name,
      email,
      password,
    });

    await this.accountRepo.createAccount(account);

    return {
      account,
    }
  }
}
