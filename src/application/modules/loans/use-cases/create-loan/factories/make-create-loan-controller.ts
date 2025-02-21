import { CreateLoanController } from "../create-loan-controller";
import { makeCreateLoanUseCase } from "./make-create-loan-use-case";

export function makeCreateLoanController() {
  const useCase = makeCreateLoanUseCase();

  return new CreateLoanController(useCase);
}
