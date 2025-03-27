import { Loan } from "../../entities/loan";
import { LoanRepository } from "../../repositories/loan-repository";

interface Input {
  accountId?: string;
  page?: number;
  perPage?: number;
};
interface Output {
  loans: Loan[]
  totalLoans: number;
};

export class GetLoansUseCase {
  constructor(
    private readonly loanRepo: LoanRepository,
  ) {}

  async execute({ accountId, page, perPage }: Input): Promise<Output> {
    const { loans, totalLoans } = await this.loanRepo.getLoans({ accountId, page, perPage });

    return {
      loans,
      totalLoans,
    }
  }
}
