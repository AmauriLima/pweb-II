import { makeBookRepository } from "../../../repositories/make-book-repository";
import { CreateBookUseCase } from "../create-book-use-case";

export function makeCreateBookUseCase() {
  const bookRepo = makeBookRepository();

  return new CreateBookUseCase(bookRepo);
}
