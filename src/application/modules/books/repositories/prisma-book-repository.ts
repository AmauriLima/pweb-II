import { PrismaClient } from "@prisma/client";
import { Book } from "../entities/book";
import { BookMapper } from "../mappers/book-mapper";
import { BookRepository } from "./book-repository";

export class PrismaBookRepository implements BookRepository {
  constructor(
    private readonly prisma: PrismaClient,
  ) {}

  async createBook(book: Book): Promise<void> {
    await this.prisma.book.create({
      data: BookMapper.toPersistence(book),
    })
  }
}
