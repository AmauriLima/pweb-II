import { BookRepository } from "@/application/modules/books/repositories/book-repository";
import { makeBookRepositoryTest } from "@/application/modules/books/repositories/make-book-repository-test";
import { ConflictHTTPError } from "@/application/shared/http/errors/conflict-http-error";
import { NotFoundHTTPError } from "@/application/shared/http/errors/not-found-http-error";
import { IHttpRequest } from "@/application/shared/http/interfaces/http";
import { v7 as uuid } from 'uuid';
import { LOAN_ALREADY_CLOSED } from "../../../docs/close-loan-swagger";
import { LOAN_NOT_FOUND_ERROR } from "../../../docs/create-loan-swagger";
import { LoanRepository } from "../../../repositories/loan-repository";
import { makeLoanRepositoryTest } from "../../../repositories/make-loan-repository-test";
import { CloseLoanController } from "../close-loan-controller";
import { CloseLoanUseCase } from "../close-loan-use-case";
import { makeCloseLoanController } from "../factories/make-close-loan-controller";
import { makeCloseLoanUseCase } from "../factories/make-close-loan-use-case";
import { book1, loan1, loan2, loans } from "./mock";

describe("Close loan controller", () => {
  let loanrepo: LoanRepository;
  let bookrepo: BookRepository;
  let useCase: CloseLoanUseCase;
  let controller: CloseLoanController;

  beforeEach(() => {
    loanrepo = makeLoanRepositoryTest(loans);
    bookrepo = makeBookRepositoryTest();
    useCase = makeCloseLoanUseCase(loanrepo, bookrepo);
    controller = makeCloseLoanController(useCase);
  });

  it("Deve fechar um empréstimo", async () => {
    await bookrepo.createBook(book1);

    const response = await controller.handle({
      params: {
        loanId: loan1.id,
      },
    } as unknown as IHttpRequest);

    const book = await bookrepo.getBookById(book1.id);

    expect(book?.loanAmount).toBe(book1.loanAmount - 1);
    expect(response.statusCode).toBe(201);
  });

  it("Deve retornar erro 404 se o empréstimo não for encontrado", async () => {
    await expect( controller.handle({
      params: {
        loanId: uuid(),
      },
    } as unknown as IHttpRequest)).rejects.toThrow(new NotFoundHTTPError(LOAN_NOT_FOUND_ERROR))
  });

  it("Deve retornar erro 404 se o empréstimo já tiver sido entregue", async () => {
    await expect( controller.handle({
      params: {
        loanId: loan2.id,
      },
    } as unknown as IHttpRequest)).rejects.toThrow(new ConflictHTTPError(LOAN_ALREADY_CLOSED))
  });
});
