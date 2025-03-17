import { CreateBookController } from "../create-book-controller";
import { CreateBookUseCase } from "../create-book-use-case";
import { makeCreateBookUseCase } from "./make-create-book-use-case";

export function makeCreateBookController(useCaseParam?: CreateBookUseCase) {
  const useCase = useCaseParam ?? makeCreateBookUseCase();

  return new CreateBookController(useCase);
}
