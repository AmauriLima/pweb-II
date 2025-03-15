import { AccountRepository } from "../../../repositories/account-repository";
import { makeAccountRepositoryTest } from "../../../repositories/make-account-repository-test";
import { makeGetAccountsUseCase } from "../factories/make-get-accounts-use-case";
import { GetAccountsUseCase } from "../get-accounts-use-case";
import { accounts } from "./mock";

describe("Get accounts use case", () => {
  let repo: AccountRepository;
  let useCase: GetAccountsUseCase;

  beforeAll(async () => {
    repo = makeAccountRepositoryTest(accounts);
    useCase = makeGetAccountsUseCase(repo);
  });

  it("deve retornar uma lista vazia", async () => {
    const useCase = makeGetAccountsUseCase(makeAccountRepositoryTest());
    const response = await useCase.execute({ });

    expect(response).toHaveProperty("accounts");
    expect(response).toHaveProperty("nextCursor");
    expect(response.accounts).toHaveLength(0);
  });

  it("deve retornar uma lista de contas", async () => {
    const response = await useCase.execute({});

    expect(response).toHaveProperty("accounts");
    expect(response).toHaveProperty("nextCursor");
    expect(response.accounts).toHaveLength(2);
    expect(response.accounts[0]).toHaveProperty("name");
    expect(response.accounts[0]).toHaveProperty("email");
    expect(response.accounts[0]).toHaveProperty("roleCode");
    expect(response.accounts[0]).toHaveProperty("password");
  });
});
