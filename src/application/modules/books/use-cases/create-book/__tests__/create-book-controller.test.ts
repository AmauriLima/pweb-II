import { IHttpRequest } from "@/application/shared/http/interfaces/http";
import { BookRepository } from "../../../repositories/book-repository";
import { makeBookRepository } from "../../../repositories/make-book-repository";
import { makeBookRepositoryTest } from "../../../repositories/make-book-repository-test";
import { CreateBookController } from "../create-book-controller";
import { CreateBookUseCase } from "../create-book-use-case";
import { makeCreateBookController } from "../factories/make-create-book-controller";
import { makeCreateBookUseCase } from "../factories/make-create-book-use-case";
import { account1, book1, book2 } from "./mock";
import { ZodError } from "zod";
import { ForbiddenHTTPError } from "@/application/shared/http/errors/forbidden-http-error";
import { VALIDATE_ROLE_HIERARCHY_ERROR } from "@/application/modules/accounts/use-cases/validate-role-hierarchy/validate-role-hierarchy-use-case";

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


it('deve dar acesso negado ao tentar criar um livro sem ter permissão adequada', async () => {
    await expect(controller.handle({
      body: {
        "name": book1.name,
        "description": book1.description,
        "coverUrl": book1.coverUrl,
        "totalAmount": book1.totalAmount,
        "loanAmount": book1.loanAmount
      },
      account: {
        id: account1.id,
        role: account1.roleCode
      }
    } as unknown as IHttpRequest)).rejects.toThrow(new ForbiddenHTTPError(VALIDATE_ROLE_HIERARCHY_ERROR));
  }
);


});