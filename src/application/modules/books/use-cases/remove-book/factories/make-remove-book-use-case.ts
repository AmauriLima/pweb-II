import { BookRepository } from "../../../repositories/book-repository";
import { makeBookRepository } from "../../../repositories/make-book-repository";
import { RemoveBookUsecase } from "../remove-book-use-case";

export function makeRemoveBookUseCase(repo?: BookRepository ) {
  const bookRepo = repo ?? makeBookRepository();

  return new RemoveBookUsecase(bookRepo);
}
