import { Loan } from "../../entities/loan";
import { LoanRepository } from "../../repositories/loan-repository";

interface Input {
  accountId?: string;
  cursor?: string | null;
  take?: number;
};
interface Output {
  loans: Loan[]
  nextCursor: string | null;
};

export class GetLoansUseCase {
  constructor(
    private readonly loanRepo: LoanRepository,
  ) {}

  async execute({ accountId, cursor, take }: Input): Promise<Output> {
    const { loans, nextCursor } = cursor === null
      ? { loans: [], nextCursor: null }
      : await this.loanRepo.getLoans({ accountId, cursor, take });

    return {
      loans,
      nextCursor,
    }
  }

  
}
