import { NotFoundHTTPError } from "@/application/shared/http/errors/not-found-http-error";
import { IUseCase } from "@/application/shared/http/interfaces/use-case";
import { ACCOUNT_NOT_FOUND_ERROR } from "../../docs/delete-account-swagger";
import { AccountRepository } from "../../repositories/account-repository";

type IInput = {
  accountId: string;
};

type IOutput = void;

export class RemoveAccountUsecase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly accountRepo: AccountRepository,
  ) {}

  async execute({ accountId }: IInput): Promise<IOutput> {
    const account = await this.accountRepo.getAccountById(accountId);

    if (!account) {
      throw new NotFoundHTTPError(ACCOUNT_NOT_FOUND_ERROR);
    }

    await this.accountRepo.removeAccount(accountId);
  }
}
