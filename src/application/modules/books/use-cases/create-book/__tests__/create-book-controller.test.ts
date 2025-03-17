import { IHttpRequest } from "@/application/shared/http/interfaces/http";
import { ZodError } from "zod";
import { BookRepository } from "../../../repositories/book-repository";
import { makeBookRepositoryTest } from "../../../repositories/make-book-repository-test";
import { CreateBookController } from "../create-book-controller";
import { CreateBookUseCase } from "../create-book-use-case";
import { makeCreateBookController } from "../factories/make-create-book-controller";
import { makeCreateBookUseCase } from "../factories/make-create-book-use-case";
import { book1 } from "./mock";

describe("Create book controller", () => {
    let repo: BookRepository;
    let useCase: CreateBookUseCase;
    let controller: CreateBookController;

    beforeEach(async () => {
        repo = makeBookRepositoryTest();
        useCase = makeCreateBookUseCase(repo);
        controller = makeCreateBookController(useCase);
    });


  it("deve criar um livro com sucesso", async () => {
    const response = await controller.handle({
      body: {
        "name": "book1",
        "description": "description1",
        "coverUrl": "https://example.com/cover.jpg",
        "totalAmount": 10,
        "loanAmount": 0
      },
    } as unknown as IHttpRequest);


    expect(response.body).toEqual(expect.objectContaining({
      name: expect.any(String),
      description: expect.any(String),
      coverUrl: expect.any(String),
      totalAmount: expect.any(Number),
      loanAmount: expect.any(Number),
    }));
    expect(response.statusCode).toBe(201);

  },

);


it("deve criar dois livros com parâmetros iguais", async () => {
  repo.createBook(book1);

  const response = await controller.handle({
    body: {
      "name": book1.name,
      "description": book1.description,
      "coverUrl": book1.coverUrl,
      "totalAmount": book1.totalAmount,
      "loanAmount": book1.loanAmount
    },
  } as unknown as IHttpRequest);

  expect(response.body).toEqual(expect.objectContaining({
    name: expect.any(String),
    description: expect.any(String),
    coverUrl: expect.any(String),
    totalAmount: expect.any(Number),
    loanAmount: expect.any(Number),
  }));
  expect(response.statusCode).toBe(201);
}
);

it('deve dar erro ao não passar propriedades obrigatórias', async () => {
    repo.createBook(book1);

    await expect(controller.handle({
      body: {
        "name": book1.name
      },

    } as unknown as IHttpRequest)).rejects.toThrow(ZodError);
  });
});
