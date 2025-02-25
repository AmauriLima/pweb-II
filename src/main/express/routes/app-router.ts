import { makeAuthenticationMiddleware } from "@/application/shared/http/middlewares/factories/make-authentication-middleware";
import { Router } from "express";
import { middlewareAdapter } from "../adapters/middleware-adapter";
import { accountRouter } from "./account-router";
import { authRouter } from "./auth-router";
import { bookRouter } from "./book-router";
import { loanRouter } from "./loan-router";

export const appRouter = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/accounts', middlewareAdapter(makeAuthenticationMiddleware()), accountRouter)
appRouter.use('/books', middlewareAdapter(makeAuthenticationMiddleware()), bookRouter);
appRouter.use('/loans', middlewareAdapter(makeAuthenticationMiddleware()), loanRouter);
