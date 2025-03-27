import { LoanRepository } from "../../../repositories/loan-repository";
import { makeLoanRepositoryTest } from "../../../repositories/make-loan-repository-test";
import { makeGetLoansUseCase } from "../factories/make-get-loans-use-case";
import { GetLoansUseCase } from "../get-loans-use-case";
import { loans } from "./mock";

describe("Get loans use case", () => {
  let repo: LoanRepository;
  let useCase: GetLoansUseCase;

  beforeEach(async () => {
    repo = makeLoanRepositoryTest(loans);
    useCase = makeGetLoansUseCase(repo);
  });

  it("deve retornar uma lista vazia", async () => {
    const useCase = makeGetLoansUseCase(makeLoanRepositoryTest());
    const response = await useCase.execute({ });

    expect(response).toHaveProperty("loans");
    expect(response).toHaveProperty("totalLoans");
    expect(response.loans).toHaveLength(0);
  });

  it("deve retornar uma lista de empréstimos", async () => {
    const response = await useCase.execute({});

    expect(response).toHaveProperty("loans");
    expect(response).toHaveProperty("totalLoans");
    expect(response.loans).toHaveLength(2);
    expect(response.totalLoans).toBe(2);
    expect(response.loans[0]).toHaveProperty("accountId");
    expect(response.loans[0]).toHaveProperty("bookId");
    expect(response.loans[0]).toHaveProperty("dueDate");
    expect(response.loans[0]).toHaveProperty("returnDate");
  });
});
