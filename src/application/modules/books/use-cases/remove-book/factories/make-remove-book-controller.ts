import { RemoveBookController } from "../remove-book-controller";
import { makeRemoveBookUseCase } from "./make-remove-book-use-case";

export function makeRemoveBookController() {
  const useCase = makeRemoveBookUseCase();

  return new RemoveBookController(useCase);
}
