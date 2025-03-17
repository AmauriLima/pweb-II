import { CreateLoanController } from "../create-loan-controller";
import { CreateLoanUseCase } from "../create-loan-use-case";
import { makeCreateLoanUseCase } from "./make-create-loan-use-case";

export function makeCreateLoanController(useCaseParam?: CreateLoanUseCase) {
  const useCase = useCaseParam ?? makeCreateLoanUseCase();

  return new CreateLoanController(useCase);
}
