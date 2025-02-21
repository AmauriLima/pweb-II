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

  async getBooks(): Promise<Book[]> {
    const books = await this.prisma.book.findMany();
    return books.map(BookMapper.toDomain);
  }

  async getBookById(bookId: string): Promise<Book | null> {
    const book = await this.prisma.book.findUnique({
      where: { id: bookId },
    });

    return book ? BookMapper.toDomain(book) : null;
  }

  async updateBook(book: Book): Promise<void> {
    await this.prisma.book.update({
      where: { id: book.id },
      data: BookMapper.toPersistence(book),
    });
  }
}
