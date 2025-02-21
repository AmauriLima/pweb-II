import { makeAccountRepository } from "../../../repositories/make-account-repository";
import { RemoveAccountUsecase } from "../remove-account-use-case";

export function makeRemoveAccountUseCase() {
  const accountRepo = makeAccountRepository();

  return new RemoveAccountUsecase(accountRepo);
}
