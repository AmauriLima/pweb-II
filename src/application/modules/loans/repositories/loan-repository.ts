import { Loan } from "../entities/loan";

export interface LoanRepository {
  getLoans(): Promise<Loan[]>;
}
