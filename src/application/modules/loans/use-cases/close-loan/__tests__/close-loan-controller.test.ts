import { IHttpRequest } from "@/application/shared/http/interfaces/http";
import { LoanRepository } from "../../../repositories/loan-repository";
import { makeLoanRepositoryTest } from "../../../repositories/make-loan-repository-test";
import { CloseLoanController } from "../close-loan-controller";
import { CloseLoanUseCase } from "../close-loan-use-case";
import { makeCloseLoanController } from "../factories/make-close-loan-controller";
import { makeCloseLoanUseCase } from "../factories/make-close-loan-use-case";
import { loan1, book1, loan2 } from "./mock";
import { BookRepository } from "@/application/modules/books/repositories/book-repository";
import { makeBookRepositoryTest } from "@/application/modules/books/repositories/make-book-repository-test";
import { NotFoundHTTPError } from "@/application/shared/http/errors/not-found-http-error";
import { LOAN_NOT_FOUND_ERROR } from "../../../docs/create-loan-swagger";
import { BOOK_NOT_FOUND_ERROR } from "@/application/modules/books/docs/delete-book-swagger";
import { loans } from "../../get-loans/__tests__/mock";
describe("Close loan controller", () => {
  let loanrepo: LoanRepository;
  let bookrepo: BookRepository;
  let useCase: CloseLoanUseCase;
  let controller: CloseLoanController;

  beforeEach(async () => {
    loanrepo = makeLoanRepositoryTest(loans);
    bookrepo = makeBookRepositoryTest();
    useCase = makeCloseLoanUseCase(loanrepo, bookrepo);
    controller = makeCloseLoanController(useCase);
  });

    it("Deve fechar um empréstimo", async () => {
        const response = await controller.handle({
            params: {
                loanId: loan1.id,
            },
        } as unknown as IHttpRequest);
        expect(response.statusCode).toBe(201);
        
    });

    it("Deve retornar erro 404 se o empréstimo não for encontrado", async () => {
        await expect( controller.handle({
            params: {
                loanId: "f3c75409-fe6f-4a33-b3d1-31c458058ed1",
            },
        } as unknown as IHttpRequest)).rejects.toThrow(new NotFoundHTTPError(LOAN_NOT_FOUND_ERROR))
        
    });

    it("Deve retornar erro 404 se o livro não for encontrado", async () => {
        await expect( controller.handle({
            params: {
                loanId: loan1.id,
            },
        } as unknown as IHttpRequest)).rejects.toThrow(new NotFoundHTTPError(BOOK_NOT_FOUND_ERROR))
        
    });

    it("Deve retornar erro 404 se o livro não estiver emprestado", async () => {
        await expect( controller.handle({
            params: {
                loanId: loan1.id,
            },
        } as unknown as IHttpRequest)).rejects.toThrow(NotFoundHTTPError)
        
    });
    
   


    
});