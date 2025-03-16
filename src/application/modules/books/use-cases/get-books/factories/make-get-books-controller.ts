import { GetBooksController } from "../get-books-controller";
import { GetBooksUseCase } from "../get-books-use-case";
import { makeGetBooksUseCase } from "./make-get-books-use-case";

export function makeGetBooksController(useCaseParam?: GetBooksUseCase) {
  const useCase = useCaseParam ?? makeGetBooksUseCase();

  return new GetBooksController(useCase);
}