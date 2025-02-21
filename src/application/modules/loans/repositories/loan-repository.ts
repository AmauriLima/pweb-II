import { Loan } from "../entities/loan";

export interface LoanRepository {
  getLoans(): Promise<Loan[]>;
  createLoan(loan: Loan): Promise<void>;
  getLoansByAccountAndBook(accountId: string, bookId: string): Promise<Loan[]>;
  hasPendentLoan(accountId: string, bookId: string): Promise<boolean>;
}
