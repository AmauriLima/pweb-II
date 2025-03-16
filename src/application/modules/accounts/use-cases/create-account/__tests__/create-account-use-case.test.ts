import { AccountRepository } from "../../../repositories/account-repository";
import { makeAccountRepositoryTest } from "../../../repositories/make-account-repository-test";
import { CreateAccountUseCase } from "../create-account-use-case";
import { makeCreateAccountUseCase } from "../factories/make-create-account-use-case";
import { account1, account2 } from "./mock";

describe("Create account use case", () => {
  let repo: AccountRepository;
  let useCase: CreateAccountUseCase;

  beforeEach(async () => {
    repo = makeAccountRepositoryTest();
    useCase = makeCreateAccountUseCase(repo);
  });

  it('deve fazer o hashing da senha', async () => {
    const response = await useCase.execute({
      name: account2.name,
      email: account2.email,
      roleCode: account2.roleCode,
      password: account2.password,
      accountRole: account1.roleCode
    });

    expect(response.account).toHaveProperty("password");
    expect(response.account.password).not.toBe(account1.password);
  });
});


