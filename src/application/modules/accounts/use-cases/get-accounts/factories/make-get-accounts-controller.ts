import { GetAccountsController } from "../get-accounts-controller";
import { makeGetAccountsUseCase } from "./make-get-accounts-use-case";

export function makeGetAccountsController() {
  const useCase = makeGetAccountsUseCase();

  return new GetAccountsController(useCase);
}
