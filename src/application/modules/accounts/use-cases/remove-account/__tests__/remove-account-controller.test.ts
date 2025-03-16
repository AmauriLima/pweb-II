import { NotFoundHTTPError } from "@/application/shared/http/errors/not-found-http-error";
import { IHttpRequest } from "@/application/shared/http/interfaces/http";
import { ACCOUNT_NOT_FOUND_ERROR } from "../../../docs/delete-account-swagger";
import { AccountRepository } from "../../../repositories/account-repository";
import { makeAccountRepositoryTest } from "../../../repositories/make-account-repository-test";
import { makeRemoveAccountController } from "../factories/make-remove-account-controller";
import { makeRemoveAccountUseCase } from "../factories/make-remove-account-use-case";
import { RemoveAccountController } from "../remove-account-controller";
import { RemoveAccountUsecase } from "../remove-account-use-case";
import { account1 } from "./mock";

describe("Remove account controller", () => {
  let repo: AccountRepository;
  let useCase: RemoveAccountUsecase;
  let controller: RemoveAccountController;

  beforeEach(async () => {
    repo = makeAccountRepositoryTest();
    useCase = makeRemoveAccountUseCase(repo);
    controller = makeRemoveAccountController(useCase);
  });

  it("deve remover uma conta com sucesso", async () => {
    repo.createAccount(account1);

    const response = await controller.handle({
      params: {
        accountId: account1.id
      }
    } as unknown as IHttpRequest);

    const { accounts } = await repo.getAccounts({});

    expect(response.body).toBe(undefined);
    expect(response.statusCode).toBe(204);
    expect(accounts).toHaveLength(0);
  });

  it("deve lançar erro 404 ao remover uma conta inexistente", async () => {
    await expect(controller.handle({
      params: {
        accountId: account1.id
      }
    } as unknown as IHttpRequest)).rejects.toThrow(new NotFoundHTTPError(ACCOUNT_NOT_FOUND_ERROR));
  });
});
