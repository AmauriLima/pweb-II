import { CloseLoanController } from "../close-loan-controller";
import { makeCloseLoanUseCase } from "./make-close-loan-use-case";

export function makeCloseLoanController() {
  const useCase = makeCloseLoanUseCase();

  return new CloseLoanController(useCase);
}
