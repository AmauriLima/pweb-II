import { Router } from "express";
import { routeAdapter } from "../adapters/route-adapter";
import { makeGetLoansController } from "@/application/modules/loans/use-cases/get-loans/factories/make-get-loans-controller";

export const loanRouter = Router();

loanRouter.get('/', routeAdapter(makeGetLoansController()));

