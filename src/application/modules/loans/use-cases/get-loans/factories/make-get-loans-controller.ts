import { GetLoansController } from "../get-loans-controller";
import { GetLoansUseCase } from "../get-loans-use-case";
import { makeGetLoansUseCase } from "./make-get-loans-use-case";

export function makeGetLoansController(useCaseParam?: GetLoansUseCase) {
  const useCase = useCaseParam ?? makeGetLoansUseCase();
  return new GetLoansController(useCase);
}