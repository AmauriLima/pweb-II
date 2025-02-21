import { makeBookRepository } from "@/application/modules/books/repositories/make-book-repository";
import { makeLoanRepository } from "../../../repositories/make-loan-repository";
import { CloseLoanUseCase } from "../close-loan-use-case";

export function makeCloseLoanUseCase() {
  const loanRepo = makeLoanRepository();
  const bookRepo = makeBookRepository();

  return new CloseLoanUseCase(loanRepo, bookRepo);
};
