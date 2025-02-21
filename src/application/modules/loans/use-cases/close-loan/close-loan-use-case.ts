import { BookOperation, BookRepository } from "@/application/modules/books/repositories/book-repository";
import { InternalServerHTTPError } from "@/application/shared/http/errors/internal-server-http-error";
import { NotFoundHTTPError } from "@/application/shared/http/errors/not-found-http-error";
import { IUseCase } from "@/application/shared/http/interfaces/use-case";
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
      throw new NotFoundHTTPError('Empréstimo não encontrado!');
    }

    if (loan.returnDate) {
      throw new NotFoundHTTPError('Esse empréstimo já foi entregue!');
    }

    loan.returnDate = new Date();

    try {
      const book = (await this.bookRepo.getBookById(loan.bookId))!;

      await this.bookRepo.changeBookLoanAmount(book, BookOperation.RETURN);

      await this.loanRepo.updateLoan(loan);

      return {
        updatedLoan: loan,
      }
    } catch {
      throw new InternalServerHTTPError('Erro ao fechar empréstimo');
    }

  }
}
