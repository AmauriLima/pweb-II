import { Router } from "express";
import { accountRouter } from "./account-router";
import { authRouter } from "./auth-router";
import { bookRouter } from "./book-router";
import { loanRouter } from "./loan-router";

export const appRouter = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/accounts', accountRouter)
appRouter.use('/books', bookRouter);
appRouter.use('/loans', loanRouter);
