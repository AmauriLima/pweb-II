import { makeCreateBookController } from "@/application/modules/books/use-cases/create-book/factories/make-create-book-controller";
import { Router } from "express";
import { routeAdapter } from "../adapters/route-adapter";

export const bookRouter = Router();

bookRouter.post("/", routeAdapter(makeCreateBookController()));
