import { Roles } from "@/application/modules/accounts/entities/account";
import { makeCreateBookController } from "@/application/modules/books/use-cases/create-book/factories/make-create-book-controller";
import { makeGetBooksController } from "@/application/modules/books/use-cases/get-books/factories/make-get-books-controller";
import { makeRemoveBookController } from "@/application/modules/books/use-cases/remove-book/factories/make-remove-book-controller";
import { makeUpdateBookController } from "@/application/modules/books/use-cases/update-book/factories/make-update-book-controller";
import { makeAuthorizationMiddleware } from "@/application/shared/http/middlewares/factories/make-authorization-middleware";
import { Router } from "express";
import { middlewareAdapter } from "../adapters/middleware-adapter";
import { routeAdapter } from "../adapters/route-adapter";

export const bookRouter = Router();

const authorizationMiddleware =
  middlewareAdapter(makeAuthorizationMiddleware([Roles.MANAGER, Roles.BOOK_MANAGER]));

bookRouter.get('/', routeAdapter(makeGetBooksController()));
bookRouter.post("/", authorizationMiddleware, routeAdapter(makeCreateBookController()));
bookRouter.put('/:bookId', authorizationMiddleware, routeAdapter(makeUpdateBookController()));
bookRouter.delete('/:bookId', authorizationMiddleware, routeAdapter(makeRemoveBookController()));
