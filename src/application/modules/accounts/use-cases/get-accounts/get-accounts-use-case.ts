import { IUseCase } from "@/application/shared/http/interfaces/use-case";
import { Account } from "../../entities/account";
import { AccountRepository } from "../../repositories/account-repository";

type IInput = void;
interface IOutput {
  accounts: Account[]
};

export class GetAccountUsecase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly accountRepo: AccountRepository,
  ) {}

  async execute(_input: IInput): Promise<IOutput> {
    const accounts = await this.accountRepo.getAccounts();

    return {
      accounts
    }
  }
}
