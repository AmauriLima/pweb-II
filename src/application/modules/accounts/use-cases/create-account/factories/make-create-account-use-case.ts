import { makeHashProvider } from "@/application/shared/providers/hash-provider/make-hash-provider";
import { makeAccountRepository } from "../../../repositories/make-account-repository";
import { CreateAccountUseCase } from "../create-account-use-case";

export function makeCreateAccountUseCase() {
  const accountRepo = makeAccountRepository();
  const hashProvider = makeHashProvider();

  return new CreateAccountUseCase(accountRepo, hashProvider);
}
