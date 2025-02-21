import { makeBookRepository } from "@/application/modules/books/repositories/make-book-repository";
import { makeLoanRepository } from "../../../repositories/make-loan-repository";
import { CreateLoanUseCase } from "../create-loan-use-case";

export function makeCreateLoanUseCase() {
  const loanRepo = makeLoanRepository();
  const bookRepo = makeBookRepository();

  return new CreateLoanUseCase(loanRepo, bookRepo);
}
