import { makeAccountRepository } from "@/application/modules/accounts/repositories/make-account-repository";
import { makeBookRepository } from "@/application/modules/books/repositories/make-book-repository";
import { makeLoanRepository } from "../../../repositories/make-loan-repository";
import { CreateLoanUseCase } from "../create-loan-use-case";
import { LoanRepository } from "../../../repositories/loan-repository";
import { BookRepository } from "@/application/modules/books/repositories/book-repository";
import { AccountRepository } from "@/application/modules/accounts/repositories/account-repository";

export function makeCreateLoanUseCase(loanrepo?: LoanRepository, bookrepo?: BookRepository, accountrepo?: AccountRepository) {
  const loanRepo = loanrepo ?? makeLoanRepository();
  const bookRepo = bookrepo ?? makeBookRepository();
  const accountRepo = accountrepo ?? makeAccountRepository();

  return new CreateLoanUseCase(loanRepo, bookRepo, accountRepo);
}
