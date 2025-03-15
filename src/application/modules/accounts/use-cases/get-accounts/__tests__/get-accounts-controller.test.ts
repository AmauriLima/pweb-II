import { IHttpRequest } from "@/application/shared/http/interfaces/http";
import { AccountRepository } from "../../../repositories/account-repository";
import { makeAccountRepositoryTest } from "../../../repositories/make-account-repository-test";
import { makeGetAccountsController } from "../factories/make-get-accounts-controller";
import { makeGetAccountsUseCase } from "../factories/make-get-accounts-use-case";
import { GetAccountsController } from "../get-accounts-controller";
import { GetAccountUsecase } from "../get-accounts-use-case";
import { accounts } from "./mock";

describe("Get accounts controller", () => {
  let repo: AccountRepository;
  let useCase: GetAccountUsecase;
  let controller: GetAccountsController;

  beforeAll(async () => {
    repo = makeAccountRepositoryTest(accounts);
    useCase = makeGetAccountsUseCase(repo);
    controller = makeGetAccountsController(useCase);
  });

  it("deve retornar uma lista vazia", async () => {
    const useCase = makeGetAccountsUseCase(makeAccountRepositoryTest());
    const controller = makeGetAccountsController(useCase)
    const response = await controller.handle({} as IHttpRequest);

    expect(response.body).toHaveLength(0);
    expect(response.statusCode).toBe(200);
  });

  it("deve retornar uma lista de contas", async () => {
    const response = await controller.handle({} as IHttpRequest);

    expect(response.body).toHaveLength(2);
    expect(response.body).toEqual(expect.not.arrayContaining(
      [expect.objectContaining({ password: expect.any(String) })]
    ));
    expect(response.statusCode).toBe(200);
  });
});
