import { makeCreateAccountController } from "@/application/modules/accounts/use-cases/create-account/factories/make-create-account-controller";
import { makeGetAccountsController } from "@/application/modules/accounts/use-cases/get-accounts/factories/make-get-accounts-controller";
import { Router } from "express";
import { routeAdapter } from "../adapters/route-adapter";

export const accountRouter = Router();

accountRouter.get('/', routeAdapter(makeGetAccountsController()));

accountRouter.post('/', routeAdapter(makeCreateAccountController()));

