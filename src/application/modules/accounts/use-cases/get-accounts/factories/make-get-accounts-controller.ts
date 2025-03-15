import { GetAccountsController } from "../get-accounts-controller";
import { GetAccountUsecase } from "../get-accounts-use-case";
import { makeGetAccountsUseCase } from "./make-get-accounts-use-case";

export function makeGetAccountsController(useCaseParam?: GetAccountUsecase) {
  const useCase = useCaseParam ?? makeGetAccountsUseCase();

  return new GetAccountsController(useCase);
}
