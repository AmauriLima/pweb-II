import { makeHashProvider } from "@/application/shared/providers/hash-provider/make-hash-provider";
import { AccountRepository } from "../../../repositories/account-repository";
import { makeAccountRepository } from "../../../repositories/make-account-repository";
import { CreateAccountUseCase } from "../create-account-use-case";

export function makeCreateAccountUseCase(repo?: AccountRepository) {
  const accountRepo = repo ?? makeAccountRepository();
  const hashProvider = makeHashProvider();

  return new CreateAccountUseCase(accountRepo, hashProvider);
}
