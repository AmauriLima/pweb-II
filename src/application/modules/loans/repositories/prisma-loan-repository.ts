import { PrismaClient } from "@prisma/client";
import { Loan } from "../entities/loan";
import { LoanMapper } from "../mappers/loan-mapper";
import { LoanRepository } from "./loan-repository";

export class PrismaLoanRepository implements LoanRepository {
  constructor(
    private readonly prisma: PrismaClient,
  ) {}

  async createLoan(loan: Loan): Promise<void> {
    await this.prisma.loan.create({
      data: LoanMapper.toPersistence(loan),
    });
  }

  async getLoans(): Promise<Loan[]> {
    const loans = await this.prisma.loan.findMany();
    return loans.map(LoanMapper.toDomain);
  }

  async getLoansByAccountAndBook(accountId: string, bookId: string): Promise<Loan[]> {
    const loans = await this.prisma.loan.findMany({
      where: { accountId, bookId, returnDate: null },
    });

    return loans.map(LoanMapper.toDomain)
  }
}
