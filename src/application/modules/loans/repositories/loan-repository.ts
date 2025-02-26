import { Loan } from "../entities/loan";

export interface LoanRepository {
  getLoans(): Promise<Loan[]>;
  getLoansByAccountId(accountId: string): Promise<Loan[]>;
  getLoanById(loanId: string): Promise<Loan | null>;
  createLoan(loan: Loan): Promise<void>;
  updateLoan(loan: Loan): Promise<void>;
  getLoansByAccountAndBook(accountId: string, bookId: string): Promise<Loan[]>;
  hasPendentLoan(accountId: string, bookId: string): Promise<boolean>;
}
