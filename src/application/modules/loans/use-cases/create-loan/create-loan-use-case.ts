import { BookOperation, BookRepository } from "@/application/modules/books/repositories/book-repository";
import { ConflictHTTPError } from "@/application/shared/http/errors/conflict-http-error";
import { NotFoundHTTPError } from "@/application/shared/http/errors/not-found-http-error";
import { IUseCase } from "@/application/shared/http/interfaces/use-case";
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
  ) {}

  async execute(input: IInput): Promise<IOutput> {
    const book = await this.bookRepo.getBookById(input.bookId);

    if (!book) {
      throw new NotFoundHTTPError('Livro não encontrado!');
    }

    if (book.loanAmount >= book.totalAmount) {
      throw new ConflictHTTPError('Livro sem estoque!');
    }

    const loans = await this.loanRepo.getLoansByAccountAndBook(input.accountId, input.bookId);

    const loanNotReturned = loans.find((loan) => loan.returnDate === null);

    if (loanNotReturned) {
      throw new ConflictHTTPError(
        'Você já tem um empréstimo desse livro em andamento, devolva primeiro para poder fazer outro'
      );
    }

    const loan = new Loan({
      accountId: input.accountId,
      bookId: input.bookId,
      dueDate: new Date(input.dueDate),
    });

    try {
      await this.bookRepo.changeBookLoanAmount(book, BookOperation.LOAN);

      await this.loanRepo.createLoan(loan);

      return {
        loan,
      };
    } catch {
      throw new Error('Erro ao criar empréstimo');
    }
  }

}
