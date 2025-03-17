import { makeLoanRepository } from "@/application/modules/loans/repositories/make-loan-repository";
import { GetLoansUseCase } from "../get-loans-use-case";
import { LoanRepository } from "../../../repositories/loan-repository";

export function makeGetLoansUseCase(repo?: LoanRepository) {
  const loanRepo = repo ?? makeLoanRepository();

  return new GetLoansUseCase(loanRepo);
}