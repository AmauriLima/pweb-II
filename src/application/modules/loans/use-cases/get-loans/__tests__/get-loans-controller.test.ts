import { IHttpRequest } from "@/application/shared/http/interfaces/http";
import { LoanRepository } from "../../../repositories/loan-repository";
import { makeLoanRepositoryTest } from "../../../repositories/make-loan-repository-test";
import { makeGetLoansController } from "../factories/make-get-loans-controller";
import { makeGetLoansUseCase } from "../factories/make-get-loans-use-case";
import { GetLoansController } from "../get-loans-controller";
import { GetLoansUseCase } from "../get-loans-use-case";
import { loans } from "./mock";

describe("get loans controller", () => {
  let loanrepo: LoanRepository;
  let useCase: GetLoansUseCase;
  let controller: GetLoansController;

  beforeEach(async () => {
    loanrepo = makeLoanRepositoryTest(loans);
    useCase = makeGetLoansUseCase(loanrepo);
    controller = makeGetLoansController(useCase);
  });

  it("deve retornar uma lista vazia", async () => {
    const useCase = makeGetLoansUseCase(makeLoanRepositoryTest());
    const controller = makeGetLoansController(useCase)
    const response = await controller.handle({ query: {} } as IHttpRequest);

    expect(response.body?.data).toHaveLength(0);
    expect(response.body?.totalItems).toBe(0);
    expect(response.statusCode).toBe(200);
  });

  it("deve retornar uma lista de empréstimos paginada", async () => {
    const response = await controller.handle({ query: {} } as IHttpRequest);

    expect(response.body?.data).toHaveLength(2);
    expect(response.body?.totalItems).toBe(2);
    expect(response.statusCode).toBe(200);
  });

  it("deve retornar uma lista de empréstimos com 1 por página", async () => {
    const response = await controller.handle({ query: { perPage: '1' } } as unknown as IHttpRequest);
    expect(response.body?.data).toHaveLength(1);
    expect(response.body?.totalItems).toBe(2);
    expect(response.statusCode).toBe(200);
  });

  it("deve retornar uma lista de empréstimos com 1 por página, para segunda e última página", async () => {
    const response = await controller.handle({ query: { perPage: '1', page: '1' } } as unknown as IHttpRequest);
    expect(response.body?.data).toHaveLength(1);
    expect(response.body?.totalItems).toBe(2);
    expect(response.statusCode).toBe(200);
  });
});
