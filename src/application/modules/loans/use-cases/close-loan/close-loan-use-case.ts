import { BookOperation, BookRepository } from "@/application/modules/books/repositories/book-repository";
import { ConflictHTTPError } from "@/application/shared/http/errors/conflict-http-error";
import { NotFoundHTTPError } from "@/application/shared/http/errors/not-found-http-error";
import { IUseCase } from "@/application/shared/http/interfaces/use-case";
import { LOAN_ALREADY_CLOSED, LOAN_NOT_FOUND } from "../../docs/close-loan-swagger";
import { Loan } from "../../entities/loan";
import { LoanRepository } from "../../repositories/loan-repository";

interface IInput {
  loanId: string;
};

interface IOutput {
  updatedLoan: Loan;
}

export class CloseLoanUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly loanRepo: LoanRepository,
    private readonly bookRepo: BookRepository,
  ) {}

  async execute({ loanId }: IInput): Promise<IOutput> {
    const loan = await this.loanRepo.getLoanById(loanId);

    if (!loan) {
      throw new NotFoundHTTPError(LOAN_NOT_FOUND);
    }

    if (loan.returnDate) {
      throw new ConflictHTTPError(LOAN_ALREADY_CLOSED);
    }

    loan.returnDate = new Date();

    const book = (await this.bookRepo.getBookById(loan.bookId))!;

    await this.bookRepo.changeBookLoanAmount(book, BookOperation.RETURN);

    await this.loanRepo.updateLoan(loan);

    return {
      updatedLoan: loan,
    }
  }
}
