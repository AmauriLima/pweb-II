import { addDefaultResponsesSwagger } from "@/application/shared/docs/add-default-responses-swagger";
import { PathItem } from "swagger-jsdoc";
import { createBookSwagger } from "./create-book-swagger";
import { deleteBookSwagger } from "./delete-book-swagger";
import { getBooksSwagger } from "./get-books-swagger";
import { updateBookSwagger } from "./update-book-swagger";

export const booksPath: PathItem = {
  post: addDefaultResponsesSwagger(createBookSwagger),
  get: addDefaultResponsesSwagger(getBooksSwagger, { omitResponses: ["400", "403"] }),
}

export const booksPathWithId: PathItem = {
  put: addDefaultResponsesSwagger(updateBookSwagger),
  delete: addDefaultResponsesSwagger(deleteBookSwagger),
}


