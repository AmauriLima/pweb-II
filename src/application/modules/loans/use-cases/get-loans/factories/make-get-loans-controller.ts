import { GetLoansController } from "../get-loans-controller";
import { makeGetLoansUseCase } from "./make-get-loans-use-case";

export function makeGetLoansController() {
  const useCase = makeGetLoansUseCase();

  return new GetLoansController(useCase);
}