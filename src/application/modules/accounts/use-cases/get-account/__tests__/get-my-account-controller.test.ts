import { IHttpRequest } from "@/application/shared/http/interfaces/http";
import { AccountRepository } from "../../../repositories/account-repository";
import { makeAccountRepositoryTest } from "../../../repositories/make-account-repository-test";

import { ZodError } from "zod";
import { makeGetAccountUseCase } from "../factories/make-get-account-use-case";
import { makeGetMyAccountController } from "../factories/make-get-my-account-controller";
import { GetAccountUseCase } from "../get-account-use-case";
import { GetMyAccountController } from "../get-my-account-controller";
import { account1, account2, accounts } from "./mock";

describe("Get my account controller", () => {
  let repo: AccountRepository;
  let useCase: GetAccountUseCase;
  let controller: GetMyAccountController;

  beforeAll(async () => {
    repo = makeAccountRepositoryTest(accounts);
    useCase = makeGetAccountUseCase(repo);
    controller = makeGetMyAccountController(useCase);
  });

  it("deve retornar o meu usuário", async () => {
    const response = await controller.handle({ account: { id: account1.id, role: account1.roleCode } } as IHttpRequest);
    const response2 = await controller.handle({ account: { id: account2.id, role: account2.roleCode } } as IHttpRequest);

    expect(response.body).toHaveProperty("id");
    expect(response.body?.id).toBe(account1.id)
    expect(response.statusCode).toBe(200);

    expect(response2.body).toHaveProperty("id");
    expect(response2.body?.id).toBe(account2.id)
    expect(response2.statusCode).toBe(200);
  });

  it("deve lançar erro ao tentar acessar sem estar logado", async () => {
    await expect(controller.handle({ } as IHttpRequest)).rejects.toThrow(ZodError);
  });
});
