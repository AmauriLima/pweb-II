import { makeCreateBookController } from "@/application/modules/books/use-cases/create-book/factories/make-create-book-controller";
import { Router } from "express";
import { routeAdapter } from "../adapters/route-adapter";
import { makeUpdateBookController } from "@/application/modules/books/use-cases/update-book/factories/make-update-book-controller";
import { makeRemoveBookController } from "@/application/modules/books/use-cases/remove-book/factories/make-remove-book-controller";
import { makeGetBooksController } from "@/application/modules/books/use-cases/get-books/factories/make-get-books-controller";

export const bookRouter = Router();

bookRouter.get('/', routeAdapter(makeGetBooksController()));

bookRouter.post("/", routeAdapter(makeCreateBookController()));
bookRouter.put('/:bookId', routeAdapter(makeUpdateBookController()));
bookRouter.delete('/:bookId', routeAdapter(makeRemoveBookController()));
