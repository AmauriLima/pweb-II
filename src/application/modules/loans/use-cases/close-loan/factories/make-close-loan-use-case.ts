import { makeBookRepository } from "@/application/modules/books/repositories/make-book-repository";
import { makeLoanRepository } from "../../../repositories/make-loan-repository";
import { CloseLoanUseCase } from "../close-loan-use-case";
import { LoanRepository } from "../../../repositories/loan-repository";
import { Book } from "@prisma/client";
import { BookRepository } from "@/application/modules/books/repositories/book-repository";

export function makeCloseLoanUseCase(loanrepo?: LoanRepository, bookrepo?: BookRepository) {
  const loanRepo = loanrepo ?? makeLoanRepository();
  const bookRepo = bookrepo ?? makeBookRepository();

  return new CloseLoanUseCase(loanRepo, bookRepo);
};
