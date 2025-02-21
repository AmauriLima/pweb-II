import { Book } from "../entities/book";

export interface BookRepository {
  createBook(book: Book): Promise<void>;
  getBooks(): Promise<Book[]>;
}
