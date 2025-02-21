import { GetBooksController } from "../get-books-controller";
import { makeGetBooksUseCase } from "./make-get-books-use-case";

export function makeGetBooksController() {
  const useCase = makeGetBooksUseCase();

  return new GetBooksController(useCase);
}