import { makeBookRepository } from "../../../repositories/make-book-repository";
import { UpdateBookUseCase } from "../update-book-use-case";
import { BookRepository } from "../../../repositories/book-repository";

export function makeUpdateBookUseCase(repo?: BookRepository) {
  const accountRepo = repo ?? makeBookRepository();

  return new UpdateBookUseCase(accountRepo);
}
