import { UpdateBookController } from "../update-book-controller";
import { makeUpdateBookUseCase } from "./make-update-book-use-case";

export function makeUpdateBookController() {
  const useCase = makeUpdateBookUseCase();

  return new UpdateBookController(useCase);
}
