import { makeHashProvider } from "@/application/shared/providers/hash-provider/make-hash-provider";
import { AccountRepository } from "../../../repositories/account-repository";
import { makeAccountRepository } from "../../../repositories/make-account-repository";
import { UpdateAccountUseCase } from "../update-account-use-case";

export function makeUpdateAccountUseCase(repo?: AccountRepository) {
  const accountRepo = repo ?? makeAccountRepository();
  const hashProvider = makeHashProvider();

  return new UpdateAccountUseCase(accountRepo, hashProvider);
}
