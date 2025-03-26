import { Loan } from "../entities/loan";

export interface LoansParams {
  accountId?: string;
  page?: number;
  perPage?: number;
}

export interface GetLoansResponse {
  loans: Loan[];
  totalLoans: number;
}
export interface LoanRepository {
  getLoans(params: LoansParams): Promise<GetLoansResponse>;
  getLoansByAccountId(accountId: string): Promise<Loan[]>;
  getLoanById(loanId: string): Promise<Loan | null>;
  createLoan(loan: Loan): Promise<void>;
  updateLoan(loan: Loan): Promise<void>;
  getLoansByAccountAndBook(accountId: string, bookId: string): Promise<Loan[]>;
  hasPendentLoan(accountId: string, bookId: string): Promise<boolean>;
}
