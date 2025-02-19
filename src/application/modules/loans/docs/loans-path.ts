import { PathItem } from "swagger-jsdoc";
import { closeLoanSwagger } from "./close-loan-swagger";
import { createLoanSwagger } from "./create-loan-swagger";
import { getLoansSwagger } from "./get-loans-swagger";


export const loansPath: PathItem = {
  post: createLoanSwagger,
  get: getLoansSwagger,
}

export const loansPathWithId: PathItem = {
  patch: closeLoanSwagger,
}


