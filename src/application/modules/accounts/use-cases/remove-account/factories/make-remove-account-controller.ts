import { RemoveAccountController } from "../remove-account-controller";
import { makeRemoveAccountUseCase } from "./make-remove-account-use-case";

export function makeRemoveAccountController() {
  const useCase = makeRemoveAccountUseCase();

  return new RemoveAccountController(useCase);
}
