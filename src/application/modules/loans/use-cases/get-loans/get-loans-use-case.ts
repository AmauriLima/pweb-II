import { InternalServerHTTPError } from "@/application/shared/http/errors/internal-server-http-error";
import { GET_LOANS_ERROR } from "../../docs/get-loans-swagger";
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
    try {
      const loans = await this.loanRepo.getLoans();

      return {
        loans
      }
    } catch {
      throw new InternalServerHTTPError(GET_LOANS_ERROR);
    }
  }
}
