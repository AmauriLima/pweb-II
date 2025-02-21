import { CreateBookController } from "../create-book-controller";
import { makeCreateBookUseCase } from "./make-create-book-use-case";

export function makeCreateBookController() {
  const useCase = makeCreateBookUseCase();

  return new CreateBookController(useCase);
}
