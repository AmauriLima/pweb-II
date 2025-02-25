import { addDefaultResponsesSwagger } from "@/application/shared/docs/add-default-responses-swagger";
import { PathItem } from "swagger-jsdoc";
import { closeLoanSwagger } from "./close-loan-swagger";
import { createLoanSwagger } from "./create-loan-swagger";
import { getLoansSwagger } from "./get-loans-swagger";

export const loansPath: PathItem = {
  post: addDefaultResponsesSwagger(createLoanSwagger),
  get: addDefaultResponsesSwagger(getLoansSwagger),
}

export const loansPathWithId: PathItem = {
  patch: addDefaultResponsesSwagger(closeLoanSwagger),
}


