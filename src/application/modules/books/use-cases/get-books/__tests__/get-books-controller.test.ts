import { IHttpRequest } from "@/application/shared/http/interfaces/http";
import { BookRepository } from "../../../repositories/book-repository";
import { makeBookRepositoryTest } from "../../../repositories/make-book-repository-test";
import { makeGetBooksController } from "../factories/make-get-books-controller";
import { makeGetBooksUseCase } from "../factories/make-get-books-use-case";
import { GetBooksController } from "../get-books-controller";
import { GetBooksUseCase } from "../get-books-use-case";
import { books } from "./mock";

describe("Get books controller", () => {
  let repo: BookRepository;
  let useCase: GetBooksUseCase;
  let controller: GetBooksController;

  beforeAll(async () => {
    repo = makeBookRepositoryTest(books);
    useCase = makeGetBooksUseCase(repo);
    controller = makeGetBooksController(useCase);
  });

    it("deve retornar uma lista vazia", async () => {
        const useCase = makeGetBooksUseCase(makeBookRepositoryTest());
        const controller = makeGetBooksController(useCase)
        const response = await controller.handle({ query: {} } as IHttpRequest);

        expect(response.body?.data).toHaveLength(0);
        expect(response.body?.totalItems).toBe(0);
        expect(response.statusCode).toBe(200);
    });

    it("deve retornar uma lista de livros paginada", async () => {
        const response = await controller.handle({ query: {} } as unknown as IHttpRequest);

        expect(response.body?.data).toHaveLength(2);
        expect(response.body?.totalItems).toBe(2);
        expect(response.statusCode).toBe(200);
    });

    it("deve retornar uma lista de livros com 1 por página", async () => {
        const response = await controller.handle({ query: { perPage: 1 } } as unknown as IHttpRequest);

        expect(response.body?.data).toHaveLength(1);
        expect(response.body?.totalItems).toBe(2);
        expect(response.statusCode).toBe(200);
    });

    it("deve retornar uma lista de livros com 1 por página, para segunda e última página", async () => {
        const response = await controller.handle({ query: { perPage: 1, page: 2 } } as unknown as IHttpRequest);

        expect(response.body?.data).toHaveLength(1);
        expect(response.body?.totalItems).toBe(2);
        expect(response.statusCode).toBe(200);
    });


    it("deve retornar uma lista de livros paginada, na última página", async () => {
        const response = await controller.handle({ query: { perPage: 3 } } as unknown as IHttpRequest);

        expect(response.body?.data).toHaveLength(2);
        expect(response.body?.totalItems).toBe(2);
        expect(response.statusCode).toBe(200);
    });


});
