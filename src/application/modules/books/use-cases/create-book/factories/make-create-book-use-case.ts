import { BookRepository } from "../../../repositories/book-repository";
import { makeBookRepository } from "../../../repositories/make-book-repository";
import { CreateBookUseCase } from "../create-book-use-case";

export function makeCreateBookUseCase(repo?: BookRepository) {
  const bookRepo = repo ?? makeBookRepository();
  return new CreateBookUseCase(bookRepo);
}

