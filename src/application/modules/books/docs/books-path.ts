import { PathItem } from "swagger-jsdoc";
import { createBookSwagger } from "./create-book-swagger";
import { deleteBookSwagger } from "./delete-book-swagger";
import { getBooksSwagger } from "./get-books-swagger";
import { updateBookSwagger } from "./update-book-swagger";

export const booksPath: PathItem = {
  post: createBookSwagger,
  get: getBooksSwagger,
}

export const booksPathWithId: PathItem = {
  put: updateBookSwagger,
  delete: deleteBookSwagger,
}


