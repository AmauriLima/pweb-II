import { InternalServerHTTPError } from "@/application/shared/http/errors/internal-server-http-error";
import { IUseCase } from "@/application/shared/http/interfaces/use-case";
import { GET_ACCOUNTS_ERROR } from "../../docs/get-accounts-swagger";
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
    try {
      const accounts = await this.accountRepo.getAccounts();

      return {
        accounts
      }
    } catch {
      throw new InternalServerHTTPError(GET_ACCOUNTS_ERROR);
    }
  }
}
