import { makeAccountRepository } from "../../../repositories/make-account-repository";
import { UpdateAccountUseCase } from "../update-account-use-case";

export function makeUpdateAccountUseCase() {
  const accountRepo = makeAccountRepository();

  return new UpdateAccountUseCase(accountRepo);
}
