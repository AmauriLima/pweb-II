import { UpdateAccountController } from "../update-account-controller";
import { makeUpdateAccountUseCase } from "./make-update-account-use-case";

export function makeUpdateAccountController() {
  const useCase = makeUpdateAccountUseCase();

  return new UpdateAccountController(useCase);
}
