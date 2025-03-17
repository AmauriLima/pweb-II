import { Book } from "../entities/book";
import { BookOperation, BookRepository, BooksParams, GetBooksResponse } from "./book-repository";

export function makeBookRepositoryTest(booksParam: Book[] = []): BookRepository {
  return new class TestBookRepository implements BookRepository {
    constructor(
      private books = booksParam,
    ) {}

    async createBook(book: Book): Promise<void> {
      this.books.push(book);
    }

    async getBooks({ cursor, take = 10 }: BooksParams): Promise<GetBooksResponse> {
      const bookCursor = cursor ? this.books.filter((book) => book.id >= cursor) : this.books;
      const books = bookCursor.slice(0, take + 1);

      const nextCursor = books[take]?.id ?? null;
      nextCursor && books.pop();

      return {
        books,
        nextCursor,
      };
    }

    async getBookById(bookId: string): Promise<Book | null> {
      return this.books.find((book) => book.id === bookId) ?? null;
    }

    async removeBook(bookId: string): Promise<void> {
      this.books = this.books.filter((book) => book.id !== bookId);
    }

    async updateBook(book: Book): Promise<void> {
      this.books = this.books.map((bk) => bk.id === book.id ? book : bk);
    }

    async changeBookLoanAmount(book: Book, operation: BookOperation): Promise<void> {
      this.books = this.books.map(bk => bk.id === book.id ? new Book({
        ...book.props,
        loanAmount: operation === BookOperation.LOAN ? book.loanAmount + 1 : book.loanAmount - 1
      }) : book)
    }
  };
}
