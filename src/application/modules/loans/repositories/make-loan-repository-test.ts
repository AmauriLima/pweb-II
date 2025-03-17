import { Loan } from "../entities/loan";
import { GetLoansResponse, LoanRepository, LoansParams } from "./loan-repository";

export function makeLoanRepositoryTest(loansParam: Loan[] = []): LoanRepository {
  return new class TestLoanRepository implements LoanRepository {
    constructor(
      private loans = loansParam,
    ) {}

    async getLoans({ cursor, take = 10 }: LoansParams): Promise<GetLoansResponse> {
      const loanCursor = cursor ? this.loans.filter((loan) => loan.id >= cursor) : this.loans;
      const loans = loanCursor.slice(0, take + 1);

      const nextCursor = loans[take]?.id ?? null;
      nextCursor && loans.pop();

      return {
        loans,
        nextCursor,
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
