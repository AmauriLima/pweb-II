import { PrismaClient } from "@prisma/client";
import { Book } from "../entities/book";
import { BookMapper } from "../mappers/book-mapper";
import { BookOperation, BookRepository, BooksParams, GetBooksResponse } from "./book-repository";

export class PrismaBookRepository implements BookRepository {
  constructor(
    private readonly prisma: PrismaClient,
  ) {}

  async changeBookLoanAmount(book: Book, operation: BookOperation): Promise<void> {
    await this.prisma.book.update({
      where: { id: book.id },
      data: {
        loanAmount: operation === BookOperation.LOAN
          ? book.loanAmount + 1
          : book.loanAmount - 1
      }
    });
  }

  async createBook(book: Book): Promise<void> {
    await this.prisma.book.create({
      data: BookMapper.toPersistence(book),
    })
  }

  async getBooks({ cursor, take = 10 }: BooksParams): Promise<GetBooksResponse> {
    const books = await this.prisma.book.findMany({
      take: take + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = books[take]?.id ?? null;
    nextCursor && books.pop();

    return {
      books: books.map(BookMapper.toDomain),
      nextCursor,
    };
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

  async removeBook(bookId: string): Promise<void> {
    await this.prisma.book.delete({
      where: { id: bookId },
    });
  }
}
