import { Loan } from "../../entities/loan";
import { LoanRepository } from "../../repositories/loan-repository";

type Input = void;
interface Output {
  loans: Loan[]
};

export class GetLoansUseCase {
  constructor(
    private readonly loanRepo: LoanRepository,
  ) {}

  async execute(_input: Input): Promise<Output> {
    const loans = await this.loanRepo.getLoans();

    return {
      loans
    }
  }
}
