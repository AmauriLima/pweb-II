import { makeCreateAccountController } from "@/application/modules/accounts/use-cases/create-account/factories/make-create-account-controller";
import { makeGetAccountsController } from "@/application/modules/accounts/use-cases/get-accounts/factories/make-get-accounts-controller";
import { makeRemoveAccountController } from "@/application/modules/accounts/use-cases/remove-account/factories/make-remove-account-controller";
import { makeUpdateAccountController } from "@/application/modules/accounts/use-cases/update-account/factories/make-update-account-controller";
import { Router } from "express";
import { routeAdapter } from "../adapters/route-adapter";

export const accountRouter = Router();

accountRouter.get('/', routeAdapter(makeGetAccountsController()));

accountRouter.post('/', routeAdapter(makeCreateAccountController()));

accountRouter.put('/:accountId', routeAdapter(makeUpdateAccountController()));
accountRouter.delete('/:accountId', routeAdapter(makeRemoveAccountController()));


