import { Loan } from "../entities/loan";
import { GetLoansResponse, LoanRepository, LoansParams } from "./loan-repository";

export function makeLoanRepositoryTest(loansParam: Loan[] = []): LoanRepository {
  return new class TestLoanRepository implements LoanRepository {
    constructor(
      private loans = loansParam,
    ) {}

    async getLoans({ page = 1, perPage = 10, accountId }: LoansParams): Promise<GetLoansResponse> {
      const filteredLoans = accountId ? this.loans.filter((loan) => loan.accountId === accountId) : this.loans;
      const start = (page - 1) * perPage;
      const end = start + perPage;
      const loans = filteredLoans.slice(start, end);

      return {
        loans,
        totalLoans: filteredLoans.length,
      };
    }

    async getLoansByAccountId(accountId: string): Promise<Loan[]> {
      return this.loans.filter((loan) => loan.accountId === accountId);
    }

    async getLoanById(loanId: string): Promise<Loan | null> {
      return this.loans.find((loan) => loan.id === loanId) ?? null;
    }

    async createLoan(loan: Loan): Promise<void> {
      this.loans.push(loan);
    }

    async getLoansByAccountAndBook(accountId: string, bookId: string): Promise<Loan[]> {
      return this.loans.filter((loan) => loan.accountId === accountId && loan.bookId === bookId);
    }

    async hasPendentLoan(accountId: string, bookId: string): Promise<boolean> {
      return this.loans.some((loan) => loan.accountId === accountId && loan.bookId === bookId && loan.returnDate === null);
    }

    async updateLoan(loan: Loan): Promise<void> {
      this.loans = this.loans.map((l) => l.id === loan.id ? loan : l);
    }
  }
}
