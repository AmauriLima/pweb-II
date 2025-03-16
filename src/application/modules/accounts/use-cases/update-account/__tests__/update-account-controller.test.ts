import { ConflictHTTPError } from "@/application/shared/http/errors/conflict-http-error";
import { ForbiddenHTTPError } from "@/application/shared/http/errors/forbidden-http-error";
import { NotFoundHTTPError } from "@/application/shared/http/errors/not-found-http-error";
import { IHttpRequest } from "@/application/shared/http/interfaces/http";
import { ZodError } from "zod";
import { ACCOUNT_NOT_FOUND_ERROR, UPDATE_ACCOUNT_CONFLICT_ERROR } from "../../../docs/update-account-swagger";
import { Roles } from "../../../entities/role";
import { AccountRepository } from "../../../repositories/account-repository";
import { makeAccountRepositoryTest } from "../../../repositories/make-account-repository-test";
import { VALIDATE_ROLE_HIERARCHY_ERROR } from "../../validate-role-hierarchy/validate-role-hierarchy-use-case";
import { makeUpdateAccountController } from "../factories/make-update-account-controller";
import { makeUpdateAccountUseCase } from "../factories/make-update-account-use-case";
import { UpdateAccountController } from "../update-account-controller";
import { UpdateAccountUseCase } from "../update-account-use-case";
import { account1, account2 } from "./mock";

describe("Create account controller", () => {
  let repo: AccountRepository;
  let useCase: UpdateAccountUseCase;
  let controller: UpdateAccountController;

  beforeEach(async () => {
    repo = makeAccountRepositoryTest();
    useCase = makeUpdateAccountUseCase(repo);
    controller = makeUpdateAccountController(useCase);
  });

  it('deve atualizar uma conta com sucesso', async () => {
    await repo.createAccount(account1);
    await repo.createAccount(account2);

    const name = "Nome atualizado";
    const password = "Teste1234";

    const response = await controller.handle({
      body: {
        name,
        password,
      },
      params: {
        accountId: account1.id,
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
    expect(response.body?.name).not.toEqual(account1.name);
    expect(response.body?.email).toEqual(account1.email);
    expect(response.body?.name).toEqual(name);
    expect(response.body?.password).not.toEqual(password);
    expect(response.statusCode).toBe(201);
  });

  it('deve dar erro ao não passar propriedades obrigatórias', async () => {
    repo.createAccount(account1);

    await expect(controller.handle({
      account: {
        id: account1.id,
        role: account1.roleCode
      }
    } as unknown as IHttpRequest)).rejects.toThrow(ZodError);
  });

  it('deve dar erro ao tentar atualizar uma conta inexistente', async () => {
    repo.createAccount(account1);

    await expect(controller.handle({
      body: {},
      params: {
        accountId: account2.id
      },
      account: {
        id: account1.id,
        role: account1.roleCode
      }
    } as unknown as IHttpRequest)).rejects.toThrow(new NotFoundHTTPError(ACCOUNT_NOT_FOUND_ERROR));
  });

  it('deve atualizar uma conta com e-mail que ela mesma já usa', async () => {
    repo.createAccount(account1);

    const response = await controller.handle({
      body: {
        "email": account1.email,
      },
      params: {
        accountId: account1.id
      },
      account: {
        id: account1.id,
        role: account1.roleCode
      }
    } as unknown as IHttpRequest);

    expect(response.statusCode).toBe(201)
  });

  it('deve dar conflito ao tentar atualizar uma conta com e-mail que já está em uso', async () => {
    repo.createAccount(account1);
    repo.createAccount(account2);

    await expect(controller.handle({
      body: {
        "email": account2.email,
      },
      params: {
        accountId: account1.id
      },
      account: {
        id: account1.id,
        role: account1.roleCode
      }
    } as unknown as IHttpRequest)).rejects.toThrow(new ConflictHTTPError(UPDATE_ACCOUNT_CONFLICT_ERROR));
  });

  it('deve dar acesso negado ao tentar atualizar uma conta sem ter permissão adequada', async () => {
    repo.createAccount(account1);

    await expect(controller.handle({
      body: {
        "roleCode": Roles.ADMIN,
      },
      params: {
        accountId: account2.id
      },
      account: {
        id: account2.id,
        role: Roles.USER
      }
    } as unknown as IHttpRequest)).rejects.toThrow(new ForbiddenHTTPError(VALIDATE_ROLE_HIERARCHY_ERROR));
  });
});


