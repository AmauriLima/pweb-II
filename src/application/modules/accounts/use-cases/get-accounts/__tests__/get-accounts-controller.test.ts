import { IHttpRequest } from "@/application/shared/http/interfaces/http";
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

  beforeAll(async () => {
    repo = makeAccountRepositoryTest(accounts);
    useCase = makeGetAccountsUseCase(repo);
    controller = makeGetAccountsController(useCase);
  });

  it("deve retornar uma lista vazia", async () => {
    const useCase = makeGetAccountsUseCase(makeAccountRepositoryTest());
    const controller = makeGetAccountsController(useCase)
    const response = await controller.handle({ query: {} } as IHttpRequest);

    expect(response.body?.data).toHaveLength(0);
    expect(response.body?.nextCursor).toBe(null);
    expect(response.statusCode).toBe(200);
  });

  it("deve retornar uma lista de contas paginada", async () => {
    const response = await controller.handle({ query: {} } as IHttpRequest);

    expect(response.body?.data).toHaveLength(2);
    expect(response.body?.data).toEqual(expect.arrayContaining(
      [expect.not.objectContaining({ password: expect.any(String) })]
    ));
    expect(response.body?.nextCursor).toBe(null);
    expect(response.statusCode).toBe(200);
  });

  it("deve retornar uma lista de contas com 1 por página", async () => {
    const response = await controller.handle({ query: { limit: '1' } } as unknown as IHttpRequest);

    expect(response.body?.data).toHaveLength(1);
    expect(response.body?.data).toEqual(expect.arrayContaining(
      [expect.not.objectContaining({ password: expect.any(String), id: account1.id })]
    ));
    expect(response.body?.nextCursor).toBe(account2.id);
    expect(response.statusCode).toBe(200);
  });

  it("deve retornar uma lista de contas com 1 por página, para segunda e última página", async () => {
    const response = await controller.handle({ query: { limit: '1', cursor: account2.id } } as unknown as IHttpRequest);

    expect(response.body?.data).toHaveLength(1);
    expect(response.body?.data).toEqual(expect.arrayContaining(
      [expect.not.objectContaining({ password: expect.any(String), id: account2.id })]
    ));
    expect(response.body?.nextCursor).toBe(null);
    expect(response.statusCode).toBe(200);
  });

  it("deve retornar uma lista de contas paginada, na última página", async () => {
    const response = await controller.handle({ query: { limit: '3' } } as unknown as IHttpRequest);

    expect(response.body?.data).toHaveLength(2);
    expect(response.body?.nextCursor).toBe(null);
    expect(response.statusCode).toBe(200);
  });
});
