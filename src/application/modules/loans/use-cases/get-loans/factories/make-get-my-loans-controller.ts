import { GetMyLoansController } from "../get-my-loans-controller";
import { makeGetLoansUseCase } from "./make-get-loans-use-case";

export function makeGetMyLoansController() {
  const useCase = makeGetLoansUseCase();

  return new GetMyLoansController(useCase);
}
