import { Router } from "express";
import { accountRouter } from "./account-router";
import { bookRouter } from "./book-router";

export const appRouter = Router();

appRouter.use('/accounts', accountRouter)
appRouter.use('/books', bookRouter);
