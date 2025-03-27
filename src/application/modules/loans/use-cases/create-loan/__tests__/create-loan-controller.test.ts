import { ACCOUNT_NOT_FOUND_ERROR } from "@/application/modules/accounts/docs/delete-account-swagger";
import { AccountRepository } from "@/application/modules/accounts/repositories/account-repository";
import { makeAccountRepositoryTest } from "@/application/modules/accounts/repositories/make-account-repository-test";
import { BOOK_NOT_FOUND_ERROR } from "@/application/modules/books/docs/delete-book-swagger";
import { BookRepository } from "@/application/modules/books/repositories/book-repository";
import { makeBookRepositoryTest } from "@/application/modules/books/repositories/make-book-repository-test";
import { ConflictHTTPError } from "@/application/shared/http/errors/conflict-http-error";
import { NotFoundHTTPError } from "@/application/shared/http/errors/not-found-http-error";
import { IHttpRequest } from "@/application/shared/http/interfaces/http";
import { BOOK_OUT_ERROR, LOAN_IN_PROGRESS_ERROR } from "../../../docs/create-loan-swagger";
import { LoanRepository } from "../../../repositories/loan-repository";
import { makeLoanRepositoryTest } from "../../../repositories/make-loan-repository-test";
import { CreateLoanController } from "../../create-loan/create-loan-controller";
import { CreateLoanUseCase } from "../../create-loan/create-loan-use-case";
import { makeCreateLoanController } from "../../create-loan/factories/make-create-loan-controller";
import { makeCreateLoanUseCase } from "../../create-loan/factories/make-create-loan-use-case";
import { account1, book1, book2, loan1 } from "./mock";

describe("Create loan controller", () => {
  let loanrepo: LoanRepository;
  let bookrepo: BookRepository;
  let accountrepo: AccountRepository;
  let useCase: CreateLoanUseCase;
  let controller: CreateLoanController;

  beforeEach(async () => {
    loanrepo = makeLoanRepositoryTest();
    bookrepo = makeBookRepositoryTest();
    accountrepo = makeAccountRepositoryTest();
    useCase = makeCreateLoanUseCase(loanrepo, bookrepo, accountrepo);
    controller = makeCreateLoanController(useCase);
    });

    it("Deve criar um empréstimo", async () => {
        await bookrepo.createBook(book1);
        await accountrepo.createAccount(account1);

        const response = await controller.handle({
            body: {
                bookId: book1.id,
                accountEmail: account1.email,
                dueDate: "2025-03-17T00:00:06.905Z",
                returnDate: "2025-03-17T00:00:06.905Z"
            },
        } as unknown as IHttpRequest);

        const book = await bookrepo.getBookById(book1.id);

        expect(book?.loanAmount).toBe(book1.loanAmount + 1);
        expect(response.statusCode).toBe(201);

    });

    it("Deve retornar erro 404 se o livro não for encontrado", async () => {
      await accountrepo.createAccount(account1);
      await expect( controller.handle({
          body: {
              bookId: book1.id,
              accountEmail: account1.email,
              dueDate: "2025-03-17T00:00:06.905Z",
              returnDate: "2025-03-17T00:00:06.905Z"
          },
      } as unknown as IHttpRequest)).rejects.toThrow(new NotFoundHTTPError(BOOK_NOT_FOUND_ERROR));
    });

    it("Deve retornar erro 404 se a conta não for encontrada", async () => {
        await bookrepo.createBook(book1);
        await expect( controller.handle({
            body: {
                bookId: book1.id,
                accountEmail: account1.email,
                dueDate: "2025-03-17T00:00:06.905Z",
                returnDate: "2025-03-17T00:00:06.905Z"
            },
        } as unknown as IHttpRequest)).rejects.toThrow(new NotFoundHTTPError(ACCOUNT_NOT_FOUND_ERROR))
    });

    it("Deve retornar erro 409 se o livro estiver sem estoque", async () => {
      await accountrepo.createAccount(account1);
      await bookrepo.createBook(book2);

      await expect( controller.handle({
          body: {
              bookId: book2.id,
              accountEmail: account1.email,
              dueDate: "2025-03-17T00:00:06.905Z",
              returnDate: "2025-03-17T00:00:06.905Z"
          },
      } as unknown as IHttpRequest)).rejects.toThrow(new ConflictHTTPError(BOOK_OUT_ERROR))
    });

    it("Deve retornar erro 409 se o livro estiver já tiver um emprestimo aberto com o usuario", async () => {
      await bookrepo.createBook(book1);
      await accountrepo.createAccount(account1);
      await loanrepo.createLoan(loan1);

      await expect( controller.handle({
          body: {
              bookId: loan1.bookId,
              accountEmail: account1.email,
              dueDate: "2025-03-17T00:00:06.905Z",
              returnDate: "2025-03-17T00:00:06.905Z"
          },
      } as unknown as IHttpRequest)).rejects.toThrow(new ConflictHTTPError(LOAN_IN_PROGRESS_ERROR))
    });
  });
