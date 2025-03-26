import { Book } from "../entities/book";

export enum BookOperation {
  LOAN = "LOAN",
  RETURN = "RETURN",
}

export interface BooksParams {
  page?: number;
  perPage?: number;
}

export interface GetBooksResponse {
  books: Book[];
  totalBooks: number;
}

export interface BookRepository {
  createBook(book: Book): Promise<void>;
  getBooks(params: BooksParams): Promise<GetBooksResponse>;
  getBookById(bookId: string): Promise<Book | null>;
  updateBook(book: Book): Promise<void>;
  removeBook(bookId: string): Promise<void>;

  changeBookLoanAmount(book: Book, operation: BookOperation): Promise<void>;
}
