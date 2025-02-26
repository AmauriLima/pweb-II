import { Loan } from "../../entities/loan";
import { LoanRepository } from "../../repositories/loan-repository";

interface Input {
  accountId?: string;
};
interface Output {
  loans: Loan[]
};

export class GetLoansUseCase {
  constructor(
    private readonly loanRepo: LoanRepository,
  ) {}

  async execute({ accountId }: Input): Promise<Output> {
    const loans = accountId
      ? await this.loanRepo.getLoansByAccountId(accountId)
      : await this.loanRepo.getLoans();

    return {
      loans
    }
  }
}
