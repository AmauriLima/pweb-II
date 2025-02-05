import { CreateAccountController } from "../create-account-controller";
import { makeCreateAccountUseCase } from "./make-create-account-use-case";

export function makeCreateAccountController() {
  const useCase = makeCreateAccountUseCase();

  return new CreateAccountController(useCase);
}
