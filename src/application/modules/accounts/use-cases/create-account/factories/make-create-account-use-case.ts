import { makeAccountRepository } from "../../../repositories/make-account-repository";
import { CreateAccountUseCase } from "../create-account-use-case";

export function makeCreateAccountUseCase() {
  const accountRepo = makeAccountRepository();

  return new CreateAccountUseCase(accountRepo);
}
