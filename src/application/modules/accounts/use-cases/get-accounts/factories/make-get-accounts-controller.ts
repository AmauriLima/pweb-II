import { GetAccountsController } from "../get-accounts-controller";
import { GetAccountsUseCase } from "../get-accounts-use-case";
import { makeGetAccountsUseCase } from "./make-get-accounts-use-case";

export function makeGetAccountsController(useCaseParam?: GetAccountsUseCase) {
  const useCase = useCaseParam ?? makeGetAccountsUseCase();

  return new GetAccountsController(useCase);
}
