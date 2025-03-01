import { makeSignInController } from "@/application/modules/auth/use-cases/sign-in/factories/make-sign-in-controller";
import { Router } from "express";
import { routeAdapter } from "../adapters/route-adapter";

export const authRouter = Router();

authRouter.post('/sign-in', routeAdapter(makeSignInController()));


