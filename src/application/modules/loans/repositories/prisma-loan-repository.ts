import { PrismaClient } from "@prisma/client";
import { Loan } from "../entities/loan";
import { LoanMapper } from "../mappers/loan-mapper";
import { LoanRepository } from "./loan-repository";

export class PrismaLoanRepository implements LoanRepository {
  constructor(
    private readonly prisma: PrismaClient,
  ) {}

  async getLoans(): Promise<Loan[]> {
    const loans = await this.prisma.loan.findMany();
    return loans.map(LoanMapper.toDomain);
  }
}
