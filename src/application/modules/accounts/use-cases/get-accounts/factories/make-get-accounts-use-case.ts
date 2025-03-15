import { makeAccountRepository } from "../../../repositories/make-account-repository";
import { GetAccountsUseCase } from "../get-accounts-use-case";

export function makeGetAccountsUseCase() {
  const accountRepo = makeAccountRepository();

  return new GetAccountsUseCase(accountRepo);
}
