import { makeBookRepository } from "@/application/modules/books/repositories/make-book-repository";
import { GetBooksUseCase } from "../get-books-use-case";

export function makeGetBooksUseCase() {
  const bookRepo = makeBookRepository();

  return new GetBooksUseCase(bookRepo);
}