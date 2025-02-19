import { generateSchema } from "@anatine/zod-openapi";
import { Prisma, Book as RawBook } from "@prisma/client";
import { z } from "zod";
import { Book } from "../entities/book";

export class BookMapper {
  static toPersistence(domain: Book): Prisma.BookCreateInput {
    return {
      id: domain.id,
      name: domain.name,
      description: domain.description,
      coverUrl: domain.coverUrl,
      totalAmount: domain.totalAmount,
      loanAmount: domain.loanAmount,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    }
  }

  static toDomain(data: RawBook): Book {
    return new Book({
      id: data.id,
      name: data.name,
      description: data.description,
      coverUrl: data.coverUrl,
      totalAmount: data.totalAmount,
      loanAmount: data.loanAmount,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  static toHttp(domain: Book) {
    return {
      id: domain.id,
      name: domain.name,
      description: domain.description,
      coverUrl: domain.coverUrl,
      totalAmount: domain.totalAmount,
      loanAmount: domain.loanAmount,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    }
  }
}

const bookHttp = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  coverUrl: z.string().url(),
  totalAmount: z.number(),
  loanAmount: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const bookHttpSchema = generateSchema(bookHttp);
