import { ConflictHTTPError } from "@/application/shared/http/errors/conflict-http-error";
import { ForbiddenHTTPError } from "@/application/shared/http/errors/forbidden-http-error";
import { IHttpRequest } from "@/application/shared/http/interfaces/http";
import { ZodError } from "zod";
import { CREATE_ACCOUNT_CONFLICT_ERROR } from "../../../docs/create-account-swagger";
import { AccountRepository } from "../../../repositories/account-repository";
import { makeAccountRepositoryTest } from "../../../repositories/make-account-repository-test";
import { VALIDATE_ROLE_HIERARCHY_ERROR } from "../../validate-role-hierarchy/validate-role-hierarchy-use-case";
import { CreateAccountController } from "../create-account-controller";
import { CreateAccountUseCase } from "../create-account-use-case";
import { makeCreateAccountController } from "../factories/make-create-account-controller";
import { makeCreateAccountUseCase } from "../factories/make-create-account-use-case";
import { account1, account2 } from "./mock";

describe("Create account controller", () => {
  let repo: AccountRepository;
  let useCase: CreateAccountUseCase;
  let controller: CreateAccountController;

  beforeEach(async () => {
    repo = makeAccountRepositoryTest();
    useCase = makeCreateAccountUseCase(repo);
    controller = makeCreateAccountController(useCase);
  });

  it('deve criar uma conta com sucesso', async () => {
    const response = await controller.handle({
      body: {
        "name": account1.name,
        "email": account1.email,
        "roleCode": account1.roleCode,
        "password": account1.password
      },
      account: {
        id: account1.id,
        role: account1.roleCode
      }
    } as unknown as IHttpRequest);

    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toEqual(expect.objectContaining({
      name: expect.any(String),
      email: expect.any(String),
      roleCode: expect.any(String),
    }));
    expect(response.statusCode).toBe(201);
  });

  it('deve criar duas contas com e-mails diferentes', async () => {
    repo.createAccount(account1);

    const response = await controller.handle({
      body: {
        "name": account2.name,
        "email": account2.email,
        "roleCode": account2.roleCode,
        "password": account2.password
      },
      account: {
        id: account1.id,
        role: account1.roleCode
      }
    } as unknown as IHttpRequest);

    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toEqual(expect.objectContaining({
      name: expect.any(String),
      email: expect.any(String),
      roleCode: expect.any(String),
    }));
    expect(response.statusCode).toBe(201);
  });

  it('deve dar erro ao não passar propriedades obrigatórias', async () => {
    repo.createAccount(account1);

    await expect(controller.handle({
      body: {
        "password": account1.password
      },
      account: {
        id: account1.id,
        role: account1.roleCode
      }
    } as unknown as IHttpRequest)).rejects.toThrow(ZodError);
  });

  it('deve dar conflito ao tentar criar uma conta com e-mail já existente', async () => {
    repo.createAccount(account1);

    await expect(controller.handle({
      body: {
        "name": account1.name,
        "email": account1.email,
        "roleCode": account1.roleCode,
        "password": account1.password
      },
      account: {
        id: account1.id,
        role: account1.roleCode
      }
    } as unknown as IHttpRequest)).rejects.toThrow(new ConflictHTTPError(CREATE_ACCOUNT_CONFLICT_ERROR));
  });

  it('deve dar conflito ao tentar criar uma conta com e-mail sem ter permissão adequada', async () => {
    await expect(controller.handle({
      body: {
        "name": account1.name,
        "email": account1.email,
        "roleCode": account1.roleCode,
        "password": account1.password
      },
      account: {
        id: account2.id,
        role: account2.roleCode
      }
    } as unknown as IHttpRequest)).rejects.toThrow(new ForbiddenHTTPError(VALIDATE_ROLE_HIERARCHY_ERROR));
  });
});


