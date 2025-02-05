import { makeAccountRepository } from "../../../repositories/make-account-repository";
import { GetAccountUsecase } from "../get-accounts-use-case";

export function makeGetAccountsUseCase() {
  const accountRepo = makeAccountRepository();

  return new GetAccountUsecase(accountRepo);
}
