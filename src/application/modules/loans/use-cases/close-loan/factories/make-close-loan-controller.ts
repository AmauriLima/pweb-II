import { CloseLoanController } from "../close-loan-controller";
import { CloseLoanUseCase } from "../close-loan-use-case";
import { makeCloseLoanUseCase } from "./make-close-loan-use-case";

export function makeCloseLoanController(useCaseParam?: CloseLoanUseCase) {
  const useCase = useCaseParam ?? makeCloseLoanUseCase();

  return new CloseLoanController(useCase);
}
