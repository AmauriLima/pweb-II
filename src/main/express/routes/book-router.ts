import { makeCreateBookController } from "@/application/modules/books/use-cases/create-book/factories/make-create-book-controller";
import { Router } from "express";
import { routeAdapter } from "../adapters/route-adapter";
import { makeGetBooksController } from "@/application/modules/books/use-cases/create-book/get-books/factories/make-get-books-controller";

export const bookRouter = Router();

bookRouter.get('/', routeAdapter(makeGetBooksController()));

bookRouter.post("/", routeAdapter(makeCreateBookController()));
