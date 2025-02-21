import { makeBookRepository } from "../../../repositories/make-book-repository";
import { UpdateBookUseCase } from "../update-book-use-case";

export function makeUpdateBookUseCase() {
  const accountRepo = makeBookRepository();

  return new UpdateBookUseCase(accountRepo);
}
