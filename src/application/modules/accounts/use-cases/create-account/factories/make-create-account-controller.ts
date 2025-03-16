import { CreateAccountController } from "../create-account-controller";
import { CreateAccountUseCase } from "../create-account-use-case";
import { makeCreateAccountUseCase } from "./make-create-account-use-case";

export function makeCreateAccountController(useCaseParam?: CreateAccountUseCase) {
  const useCase = useCaseParam ?? makeCreateAccountUseCase();

  return new CreateAccountController(useCase);
}
