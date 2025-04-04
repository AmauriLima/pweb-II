import { AccountRepository } from "../../../repositories/account-repository";
import { makeAccountRepository } from "../../../repositories/make-account-repository";
import { GetAccountsUseCase } from "../get-accounts-use-case";

export function makeGetAccountsUseCase(repo?: AccountRepository) {
  const accountRepo = repo ?? makeAccountRepository();

  return new GetAccountsUseCase(accountRepo);
}
