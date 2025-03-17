import { makeBookRepository } from "@/application/modules/books/repositories/make-book-repository";
import { GetBooksUseCase } from "../get-books-use-case";
import { BookRepository } from "../../../repositories/book-repository";

export function makeGetBooksUseCase(repo?: BookRepository) {
  const bookRepo = repo ?? makeBookRepository();

  return new GetBooksUseCase(bookRepo);
}