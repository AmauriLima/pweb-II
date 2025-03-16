import { UpdateAccountController } from "../update-account-controller";
import { UpdateAccountUseCase } from "../update-account-use-case";
import { makeUpdateAccountUseCase } from "./make-update-account-use-case";

export function makeUpdateAccountController(useCaseParam?: UpdateAccountUseCase) {
  const useCase = useCaseParam ?? makeUpdateAccountUseCase();

  return new UpdateAccountController(useCase);
}
