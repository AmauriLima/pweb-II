import { makeLoanRepository } from "@/application/modules/loans/repositories/make-loan-repository";
import { GetLoansUseCase } from "../get-loans-use-case";

export function makeGetLoansUseCase() {
  const loanRepo = makeLoanRepository();

  return new GetLoansUseCase(loanRepo);
}