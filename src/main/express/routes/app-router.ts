import { Router } from "express";
import { accountRouter } from "./account-router";

export const appRouter = Router();

appRouter.use('/accounts', accountRouter)
