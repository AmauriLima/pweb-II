import { AccountRepository } from "@/application/modules/accounts/repositories/account-repository";
import { makeAccountRepositoryTest } from "@/application/modules/accounts/repositories/make-account-repository-test";
import { makeCreateAccountUseCase } from "@/application/modules/accounts/use-cases/create-account/factories/make-create-account-use-case";
import { UnauthorizedHTTPError } from "@/application/shared/http/errors/unauthorized-http-error";
import { IHttpRequest } from "@/application/shared/http/interfaces/http";
import { INVALID_CREDENTIALS_ERROR } from "../../../docs/sign-in-swagger";
import { makeSignInController } from "../factories/make-sign-in-controller";
import { makeSignInUseCase } from "../factories/make-sign-in-use-case";
import { SignInController } from "../sign-in-controller";
import { SignInUseCase } from "../sing-in-use-case";
import { account1, account2 } from "./mock";

describe("SignIn controller", () => {
  let repo: AccountRepository;
  let useCase: SignInUseCase;
  let controller: SignInController;

  beforeEach(async () => {
    repo = makeAccountRepositoryTest();
    useCase = makeSignInUseCase(repo);
    controller = makeSignInController(useCase);

    const createAccountUseCase = makeCreateAccountUseCase(repo);
    await createAccountUseCase.execute({
      name: account1.name,
      email: account1.email,
      accountRole: account1.roleCode,
      password: account1.password,
      roleCode: account1.roleCode,
    });
  });


  it("deve fazer login com sucesso", async () => {
    const response = await controller.handle({
      body: {
        email: account1.email,
        password: account1.password
      }
    } as unknown as IHttpRequest);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
    expect(response.body).toHaveProperty("role");
  });

  it("deve dar erro de autenticação ao tentar fazer login com a senha errada", async () => {
    await expect(controller.handle({
      body: {
        email: account1.email,
        password: 'Senha errada'
      }
    } as unknown as IHttpRequest)).rejects.toThrow(new UnauthorizedHTTPError(INVALID_CREDENTIALS_ERROR));
  });

  it("deve dar erro de autenticação ao tentar fazer login com email errado", async () => {
    await expect(controller.handle({
      body: {
        email: account2.email,
        password: account1.password
      }
    } as unknown as IHttpRequest)).rejects.toThrow(new UnauthorizedHTTPError(INVALID_CREDENTIALS_ERROR));
  });
});
