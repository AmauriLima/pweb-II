import { generateSchema } from "@anatine/zod-openapi";
import { Prisma, Loan as RawLoan } from "@prisma/client";
import { z } from "zod";
import { Loan } from "../entities/loan";

type RawLoanWithDetails = RawLoan & {
  account: {
    id: string;
    name: string;
  };
  book: {
    id: string;
    name: string;
  };
};

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

  static toDomain(data: RawLoanWithDetails): Loan {
    return new Loan({
      id: data.id,
      accountId: data.accountId,
      accountName: data.account.name,
      bookId: data.bookId,
      bookName: data.book.name,
      dueDate: data.dueDate,
      returnDate: data.returnDate,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  static toHttp(domain: Loan) {
    return {
      id: domain.id,
      accountId: {
        id: domain.accountId,
        name: domain.accountName,
      },
      bookId: {
        id: domain.bookId,
        name: domain.bookName,
      },
      dueDate: domain.dueDate,
      returnDate: domain.returnDate,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    }
  }
}

export const loanHttpSchema = generateSchema(
  z.object({
    id: z.string().uuid(),
    account: z.object({
      id: z.string().uuid(),
      name: z.string(),
    }),
    book: z.object({
      id: z.string().uuid(),
      name: z.string(),
    }),
    dueDate: z.string().datetime(),
    returnDate: z.string().datetime(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
);

