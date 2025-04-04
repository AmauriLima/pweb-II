import { NotFoundHTTPError } from "@/application/shared/http/errors/not-found-http-error";
import { IHttpRequest } from "@/application/shared/http/interfaces/http";
import { BOOK_NOT_FOUND_ERROR } from "../../../docs/delete-book-swagger";
import { BookRepository } from "../../../repositories/book-repository";
import { makeBookRepositoryTest } from "../../../repositories/make-book-repository-test";
import { makeRemoveBookController } from "../factories/make-remove-book-controller";
import { makeRemoveBookUseCase } from "../factories/make-remove-book-use-case";
import { RemoveBookController } from "../remove-book-controller";
import { RemoveBookUsecase } from "../remove-book-use-case";
import { books } from "./mock";

describe("Remove book controller", () => {
  let repo: BookRepository;
  let useCase: RemoveBookUsecase;
  let controller: RemoveBookController;

  beforeEach(async () => {
    repo = makeBookRepositoryTest();
    useCase = makeRemoveBookUseCase(repo);
    controller = makeRemoveBookController(useCase);
  });

  it("deve remover um livro com sucesso", async () => {
    repo.createBook(books[0]);
    const response = await controller.handle({
      params: {
        bookId: books[0].id
      }
    } as unknown as IHttpRequest);

    const { books: booksList } = await repo.getBooks({});
    expect(response.body).toBe(undefined);
    expect(response.statusCode).toBe(204);
    expect(booksList).toHaveLength(0);
  });

  it("deve lançar erro 404 ao remover um livro inexistente", async () => {
    await expect(controller.handle({
      params: {
        bookId: books[0].id
      }
    } as unknown as IHttpRequest)).rejects.toThrow(new NotFoundHTTPError(BOOK_NOT_FOUND_ERROR));
  });
});
