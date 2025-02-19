import { generateSchema } from "@anatine/zod-openapi";
import { Prisma, Loan as RawLoan } from "@prisma/client";
import { z } from "zod";
import { Loan } from "../entities/loan";

export class LoanMapper {
  static toPersistence(domain: Loan): Prisma.LoanCreateInput {
    return {
      id: domain.id,
      account: {
        connect: {
          id: domain.accountId
        }
      },
      book: {
        connect: {
          id: domain.bookId
        }
      },
      dueDate: domain.dueDate,
      returnDate: domain.returnDate,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    }
  }

  static toDomain(data: RawLoan): Loan {
    return new Loan({
      id: data.id,
      accountId: data.accountId,
      bookId: data.bookId,
      dueDate: data.dueDate,
      returnDate: data.returnDate,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  static toHttp(domain: Loan) {
    return {
      loanId: domain.id,
      accountId: domain.accountId,
      bookId: domain.bookId,
      dueDate: domain.dueDate,
      returnDate: domain.returnDate,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    }
  }
}

export const loanHttpSchema = generateSchema(
  z.object({
    loanId: z.string().uuid(),
    accountId: z.string().uuid(),
    bookId: z.string().uuid(),
    dueDate: z.string().datetime(),
    returnDate: z.string().datetime(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
);

