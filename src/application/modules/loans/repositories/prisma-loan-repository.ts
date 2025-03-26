import { PrismaClient } from "@prisma/client";
import { Loan } from "../entities/loan";
import { LoanMapper } from "../mappers/loan-mapper";
import { GetLoansResponse, LoanRepository, LoansParams } from "./loan-repository";

export class PrismaLoanRepository implements LoanRepository {
  private readonly include = {
    account: {
      select: {
        id: true,
        name: true
      }
    },
    book: {
      select: {
        id: true,
        name: true,
      }
    }
  };

  constructor(
    private readonly prisma: PrismaClient,
  ) {}

  async getLoansByAccountId(accountId: string): Promise<Loan[]> {
    const loans = await this.prisma.loan.findMany({
      where: { accountId },
      include: this.include,
    });

    return loans.map(LoanMapper.toDomain);
  }

  async createLoan(loan: Loan): Promise<void> {
    await this.prisma.loan.create({
      data: LoanMapper.toPersistence(loan),
    });
  }

  async updateLoan(loan: Loan): Promise<void> {
    await this.prisma.loan.update({
      where: { id: loan.id },
      data: LoanMapper.toPersistence(loan),
    });
  }

  async getLoans({accountId, page = 1, perPage = 10 }: LoansParams): Promise<GetLoansResponse> {
    const totalLoans = await this.prisma.book.count();
    const loans = await this.prisma.loan.findMany({
      take: perPage,
      skip: page ? (page - 1) * perPage : 0,
      where: accountId ? { accountId } : undefined,
      include: this.include,
    });

    return {
      loans: loans.map(LoanMapper.toDomain),
      totalLoans,
    }
  }

  async getLoansByAccountAndBook(accountId: string, bookId: string): Promise<Loan[]> {
    const loans = await this.prisma.loan.findMany({
      where: { accountId, bookId },
      include: this.include,
    });

    return loans.map(LoanMapper.toDomain)
  }

  async hasPendentLoan(accountId: string, bookId: string): Promise<boolean> {
    const loan = await this.prisma.loan.findFirst({
      where: {
        accountId,
        bookId,
        returnDate: null
       },
      select: { id: true }
    });

    return !!loan;
  }

  async getLoanById(loanId: string): Promise<Loan | null> {
    const loan = await this.prisma.loan.findUnique({
      where: {
        id: loanId
      },
      include: this.include,
    });

    return loan ? LoanMapper.toDomain(loan) : null;
  }
}
