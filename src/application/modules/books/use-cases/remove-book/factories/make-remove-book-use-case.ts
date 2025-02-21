import { makeBookRepository } from "../../../repositories/make-book-repository";
import { RemoveBookUsecase } from "../remove-book-use-case";

export function makeRemoveBookUseCase() {
  const bookRepo = makeBookRepository();

  return new RemoveBookUsecase(bookRepo);
}
