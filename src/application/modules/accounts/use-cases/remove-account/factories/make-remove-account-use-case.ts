import { AccountRepository } from "../../../repositories/account-repository";
import { makeAccountRepository } from "../../../repositories/make-account-repository";
import { RemoveAccountUsecase } from "../remove-account-use-case";

export function makeRemoveAccountUseCase(repo?: AccountRepository) {
  const accountRepo = repo ?? makeAccountRepository();

  return new RemoveAccountUsecase(accountRepo);
}
