import { ACCOUNT_NOT_FOUND_ERROR } from "@/application/modules/accounts/docs/delete-account-swagger";
import { AccountRepository } from "@/application/modules/accounts/repositories/account-repository";
import { BOOK_NOT_FOUND_ERROR } from "@/application/modules/books/docs/delete-book-swagger";
import { BookOperation, BookRepository } from "@/application/modules/books/repositories/book-repository";
import { ConflictHTTPError } from "@/application/shared/http/errors/conflict-http-error";
import { NotFoundHTTPError } from "@/application/shared/http/errors/not-found-http-error";
import { IUseCase } from "@/application/shared/http/interfaces/use-case";
import { BOOK_OUT_ERROR, LOAN_IN_PROGRESS_ERROR } from "../../docs/create-loan-swagger";
import { Loan } from "../../entities/loan";
import { LoanRepository } from "../../repositories/loan-repository";
import { CreateLoanSchema } from "./create-loan-dto";

type IInput = CreateLoanSchema;

interface IOutput {
  loan: Loan;
}

export class CreateLoanUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly loanRepo: LoanRepository,
    private readonly bookRepo: BookRepository,
    private readonly accountRepo: AccountRepository,
  ) {}

  async execute(input: IInput): Promise<IOutput> {
    const book = await this.bookRepo.getBookById(input.bookId);

    if (!book) {
      throw new NotFoundHTTPError(BOOK_NOT_FOUND_ERROR);
    }

    const account = await this.accountRepo.getAccountById(input.accountId);

    if (!account) {
      throw new NotFoundHTTPError(ACCOUNT_NOT_FOUND_ERROR);
    }

    if (book.loanAmount >= book.totalAmount) {
      throw new ConflictHTTPError(BOOK_OUT_ERROR);
    }

    const hasPendentLoan = await this.loanRepo.hasPendentLoan(input.accountId, input.bookId);

    if (hasPendentLoan) {
      throw new ConflictHTTPError(LOAN_IN_PROGRESS_ERROR);
    }

    const loan = new Loan({
      accountId: input.accountId,
      bookId: input.bookId,
      dueDate: new Date(input.dueDate),
    });

    await this.bookRepo.changeBookLoanAmount(book, BookOperation.LOAN);

    await this.loanRepo.createLoan(loan);

    return {
      loan,
    };
  }
}
