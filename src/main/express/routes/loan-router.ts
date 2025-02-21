import { makeCreateLoanController } from "@/application/modules/loans/use-cases/create-loan/factories/make-create-loan-controller";
import { makeGetLoansController } from "@/application/modules/loans/use-cases/get-loans/factories/make-get-loans-controller";
import { Router } from "express";
import { routeAdapter } from "../adapters/route-adapter";

export const loanRouter = Router();

loanRouter.get('/', routeAdapter(makeGetLoansController()));

loanRouter.post('/', routeAdapter(makeCreateLoanController()));

