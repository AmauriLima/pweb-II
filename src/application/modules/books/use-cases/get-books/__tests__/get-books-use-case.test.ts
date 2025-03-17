import { BookRepository } from "../../../repositories/book-repository";
import { makeBookRepositoryTest } from "../../../repositories/make-book-repository-test";
import { makeGetBooksUseCase } from "../factories/make-get-books-use-case";
import { GetBooksUseCase } from "../get-books-use-case";
import { books } from "./mock";

describe("Get books use case", () => {
  let repo: BookRepository;
  let useCase: GetBooksUseCase;

  beforeAll(async () => {
    repo = makeBookRepositoryTest(books);
    useCase = makeGetBooksUseCase(repo);
  });

    it("deve retornar uma lista vazia", async () => {
        const useCase = makeGetBooksUseCase(makeBookRepositoryTest());
        const response = await useCase.execute({ });
    
        expect(response).toHaveProperty("books");
        expect(response).toHaveProperty("nextCursor");
        expect(response.books).toHaveLength(0);
    });

    it("deve retornar uma lista de livros", async () => {
        const response = await useCase.execute({});
    
        expect(response).toHaveProperty("books");
        expect(response).toHaveProperty("nextCursor");
        expect(response.books).toHaveLength(2);
        expect(response.books[0]).toHaveProperty("name");
        expect(response.books[0]).toHaveProperty("description");
        expect(response.books[0]).toHaveProperty("coverUrl");
        expect(response.books[0]).toHaveProperty("totalAmount");
        expect(response.books[0]).toHaveProperty("loanAmount");
    });

});
