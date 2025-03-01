import { makeCloseLoanController } from "@/application/modules/loans/use-cases/close-loan/factories/make-close-loan-controller";
import { makeCreateLoanController } from "@/application/modules/loans/use-cases/create-loan/factories/make-create-loan-controller";
import { makeGetLoansController } from "@/application/modules/loans/use-cases/get-loans/factories/make-get-loans-controller";
import { Router } from "express";
import { routeAdapter } from "../adapters/route-adapter";

import { Roles } from "@/application/modules/accounts/entities/role";
import { makeGetMyLoansController } from "@/application/modules/loans/use-cases/get-loans/factories/make-get-MY-loans-controller";
import { makeAuthorizationMiddleware } from "@/application/shared/http/middlewares/factories/make-authorization-middleware";
import { middlewareAdapter } from "../adapters/middleware-adapter";

export const loanRouter = Router();

const authorizationMiddleware =
  middlewareAdapter(makeAuthorizationMiddleware([Roles.MANAGER, Roles.USER_MANAGER]));

loanRouter.get('/', authorizationMiddleware, routeAdapter(makeGetLoansController()));
loanRouter.get('/me', routeAdapter(makeGetMyLoansController()));
loanRouter.post('/', authorizationMiddleware, routeAdapter(makeCreateLoanController()));
loanRouter.patch('/:loanId', authorizationMiddleware, routeAdapter(makeCloseLoanController()));

