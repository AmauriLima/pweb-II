import { makeCreateAccountController } from "@/application/modules/accounts/use-cases/create-account/factories/make-create-account-controller";
import { makeGetAccountsController } from "@/application/modules/accounts/use-cases/get-accounts/factories/make-get-accounts-controller";
import { makeRemoveAccountController } from "@/application/modules/accounts/use-cases/remove-account/factories/make-remove-account-controller";
import { makeUpdateAccountController } from "@/application/modules/accounts/use-cases/update-account/factories/make-update-account-controller";
import { makeAuthorizationMiddleware } from "@/application/shared/http/middlewares/factories/make-authorization-middleware";

import { Roles } from "@/application/modules/accounts/entities/role";
import { Router } from "express";
import { middlewareAdapter } from "../adapters/middleware-adapter";
import { routeAdapter } from "../adapters/route-adapter";

export const accountRouter = Router();

const authorizationMiddleware =
  middlewareAdapter(makeAuthorizationMiddleware([Roles.MANAGER, Roles.USER_MANAGER]));

accountRouter.get('/', authorizationMiddleware, routeAdapter(makeGetAccountsController()));
accountRouter.post('/', authorizationMiddleware, routeAdapter(makeCreateAccountController()));
accountRouter.put('/:accountId', authorizationMiddleware, routeAdapter(makeUpdateAccountController()));
accountRouter.delete('/:accountId', authorizationMiddleware, routeAdapter(makeRemoveAccountController()));


