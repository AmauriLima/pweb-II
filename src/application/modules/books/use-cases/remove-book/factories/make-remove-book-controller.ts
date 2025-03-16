import { RemoveBookController } from "../remove-book-controller";
import { RemoveBookUsecase } from "../remove-book-use-case";
import { makeRemoveBookUseCase } from "./make-remove-book-use-case";

export function makeRemoveBookController(useCaseParam?: RemoveBookUsecase) {
  const useCase = useCaseParam ?? makeRemoveBookUseCase();

  return new RemoveBookController(useCase);
}
