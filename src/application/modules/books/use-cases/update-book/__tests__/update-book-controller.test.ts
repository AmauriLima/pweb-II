import { IHttpRequest } from "@/application/shared/http/interfaces/http";
import { BookRepository } from "../../../repositories/book-repository";
import { makeBookRepositoryTest } from "../../../repositories/make-book-repository-test";
import { makeUpdateBookController } from "../../update-book/factories/make-update-book-controller";
import { makeUpdateBookUseCase } from "../../update-book/factories/make-update-book-use-case";
import { UpdateBookController } from "../../update-book/update-book-controller";
import { UpdateBookUseCase } from "../../update-book/update-book-use-case";
import { books } from "./mock";
import { NotFoundHTTPError } from "@/application/shared/http/errors/not-found-http-error";
import { ZodError } from "zod";
import { BOOK_NOT_FOUND_ERROR } from "../../../docs/delete-book-swagger";

describe("Update book controller", () => {
  let repo: BookRepository;
  let useCase: UpdateBookUseCase;
  let controller: UpdateBookController;

  beforeEach(async () => {
    repo = makeBookRepositoryTest();
    useCase = makeUpdateBookUseCase(repo);
    controller = makeUpdateBookController(useCase);
  });

  it("deve atualizar um livro com sucesso", async () => {
    repo.createBook(books[0]);
    const response = await controller.handle({
      body: {
        name: "Nome atualizado",
        description: "Descrição atualizada",
        coverUrl: "https://cover.com",
        totalAmount: 12,
      },
      params: {
        bookId: books[0].id,
      },
    } as unknown as IHttpRequest);

    const { books: booksList } = await repo.getBooks({});
    expect(response.body).not.toBe(undefined);
    expect(response.statusCode).toBe(201);
    expect(booksList).toHaveLength(1);
    expect(booksList[0].name).toBe("Nome atualizado");
    expect(booksList[0].description).toBe("Descrição atualizada");
    expect(booksList[0].coverUrl).toBe("https://cover.com");
    expect(booksList[0].totalAmount).toBe(12);
    expect(booksList[0].loanAmount).toBe(0);
  });

  it("deve lançar erro 404 ao atualizar um livro inexistente", async () => {
    await expect(
      controller.handle({
        body: {
          name: "Nome atualizado",
          description: "Descrição atualizada",
          coverUrl: "https://cover.com",
          totalAmount: 12,
        },
        params: {
          bookId: books[0].id,
        },
      } as unknown as IHttpRequest)
    ).rejects.toThrow(NotFoundHTTPError);
  });

  it("deve permitir atualizar parcialmente um livro", async () => {
    repo.createBook(books[0]);
    const response = await controller.handle({
      body: {
        name: "Nome parcial atualizado",
      },
      params: {
        bookId: books[0].id,
      },
    } as unknown as IHttpRequest);

    const { books: booksList } = await repo.getBooks({});
    expect(response.statusCode).toBe(201);
    expect(booksList[0].name).toBe("Nome parcial atualizado");
    expect(booksList[0].description).toBe(books[0].description);
    expect(booksList[0].coverUrl).toBe(books[0].coverUrl);
    expect(booksList[0].totalAmount).toBe(books[0].totalAmount);
  });

  it("deve retornar erro 400 se o nome for inválido", async () => {
    repo.createBook(books[0]);

    await expect(controller.handle({
      body: {
        name: "",
      },
      params: {
        bookId: books[0].id,
      },
    } as unknown as IHttpRequest)).rejects.toThrow(ZodError);

    
  });

  it("deve retornar erro 400 se a URL da capa for inválida", async () => {
    repo.createBook(books[0]);

    await expect(controller.handle({
      body: {
        coverUrl: "invalid-url",
      },
      params: {
        bookId: books[0].id,
      },
    } as unknown as IHttpRequest)).rejects.toThrow(ZodError);
  });

  it("não deve chamar updateBook se o livro não existir", async () => {
    const spy = jest.spyOn(repo, "updateBook");
    await expect(
      controller.handle({
        body: {
          name: "Nome atualizado",
          description: "Descrição atualizada",
          coverUrl: "https://cover.com",
          totalAmount: 12,
        },
        params: {
          bookId: books[0].id,
        },
      } as unknown as IHttpRequest)
    ).rejects.toThrow(new NotFoundHTTPError(BOOK_NOT_FOUND_ERROR));
    expect(spy).not.toHaveBeenCalled();
  });

  it("deve manter valores antigos se os campos não forem fornecidos", async () => {
    repo.createBook(books[0]);

    const response = await controller.handle({
      body: {},
      params: {
        bookId: books[0].id,
      },
    } as unknown as IHttpRequest);

    const { books: booksList } = await repo.getBooks({});
    expect(response.statusCode).toBe(201);
    expect(booksList[0].name).toBe(books[0].name);
    expect(booksList[0].description).toBe(books[0].description);
    expect(booksList[0].coverUrl).toBe(books[0].coverUrl);
    expect(booksList[0].totalAmount).toBe(books[0].totalAmount);
  });

});
