import { IHttpRequest } from "@/application/shared/http/interfaces/http";
import { Account } from "../../../entities/account";
import { Roles } from "../../../entities/role";
import { AccountRepository } from "../../../repositories/account-repository";
import { makeAccountRepositoryTest } from "../../../repositories/make-account-repository-test";
import { makeGetAccountsController } from "../factories/make-get-accounts-controller";
import { makeGetAccountsUseCase } from "../factories/make-get-accounts-use-case";
import { GetAccountsController } from "../get-accounts-controller";
import { GetAccountsUseCase } from "../get-accounts-use-case";
import { account1, account2, accounts } from "./mock";

describe("Get accounts controller", () => {
  let repo: AccountRepository;
  let useCase: GetAccountsUseCase;
  let controller: GetAccountsController;

  beforeEach(async () => {
    repo = makeAccountRepositoryTest(accounts);
    useCase = makeGetAccountsUseCase(repo);
    controller = makeGetAccountsController(useCase);
  });

  it("deve retornar uma lista vazia", async () => {
    const useCase = makeGetAccountsUseCase(makeAccountRepositoryTest());
    const controller = makeGetAccountsController(useCase)
    const response = await controller.handle({ query: {} } as IHttpRequest);

    expect(response.body?.data).toHaveLength(0);
    expect(response.body?.totalItems).toBe(0);
    expect(response.statusCode).toBe(200);
  });

  it("deve retornar uma lista de contas paginada", async () => {
    const response = await controller.handle({ query: {} } as IHttpRequest);

    expect(response.body?.data).toHaveLength(2);
    expect(response.body?.data).toEqual(expect.arrayContaining(
      [expect.not.objectContaining({ password: expect.any(String) })]
    ));
    expect(response.body?.totalItems).toBe(2);
    expect(response.statusCode).toBe(200);
  });

  it("deve retornar uma lista de contas com 1 por página", async () => {
    const response = await controller.handle({ query: { perPage: 1 } } as unknown as IHttpRequest);

    expect(response.body?.data).toHaveLength(1);
    expect(response.body?.data).toEqual(expect.arrayContaining(
      [expect.not.objectContaining({ password: expect.any(String), id: account1.id })]
    ));
    expect(response.body?.totalItems).toBe(2);
    expect(response.statusCode).toBe(200);
  });

  it("deve retornar uma lista de contas com 1 por página, para segunda e última página", async () => {
    repo.createAccount(new Account({
      email: "teste@gmail.com",
      name: 'teste',
      password: 'teste',
      roleCode: Roles.USER
    }));
    const response = await controller.handle({ query: { perPage: 1, page: 2 } } as unknown as IHttpRequest);

    expect(response.body?.data).toHaveLength(1);
    expect(response.body?.data).toEqual(expect.arrayContaining(
      [expect.not.objectContaining({ password: expect.any(String), id: account2.id })]
    ));
    expect(response.body?.totalItems).toBe(3);
    expect(response.statusCode).toBe(200);
  });

  it("deve retornar uma lista de contas paginada, na última página", async () => {
    const response = await controller.handle({ query: { perPage: 3 } } as unknown as IHttpRequest);

    expect(response.body?.data).toHaveLength(3);
    expect(response.body?.totalItems).toBe(3);
    expect(response.statusCode).toBe(200);
  });
});
