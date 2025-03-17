import { UpdateBookController } from "../update-book-controller";
import { UpdateBookUseCase } from "../update-book-use-case";
import { makeUpdateBookUseCase } from "./make-update-book-use-case";

export function makeUpdateBookController(useCaseParam?: UpdateBookUseCase) {
  const useCase = useCaseParam ?? makeUpdateBookUseCase();

  return new UpdateBookController(useCase);
}
