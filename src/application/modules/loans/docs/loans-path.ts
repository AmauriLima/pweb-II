import { PathItem } from "swagger-jsdoc";
import { createLoanSwagger } from "./create-loan-swagger";
import { getLoansSwagger } from "./get-loans-swagger";
import { updateLoanSwagger } from "./update-loan-swagger";


export const loansPath: PathItem = {
  post: createLoanSwagger,
  get: getLoansSwagger,
}

export const loansPathWithId: PathItem = {
  put: updateLoanSwagger,
}


