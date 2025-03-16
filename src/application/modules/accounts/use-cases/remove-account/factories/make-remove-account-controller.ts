import { RemoveAccountController } from "../remove-account-controller";
import { RemoveAccountUsecase } from "../remove-account-use-case";
import { makeRemoveAccountUseCase } from "./make-remove-account-use-case";

export function makeRemoveAccountController(useCaseParam?: RemoveAccountUsecase) {
  const useCase = useCaseParam ?? makeRemoveAccountUseCase();

  return new RemoveAccountController(useCase);
}
