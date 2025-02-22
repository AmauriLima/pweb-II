import { InternalServerHTTPError } from "@/application/shared/http/errors/internal-server-http-error";
import { GET_BOOKS_ERROR } from "../../docs/get-books-swagger";
import { Book } from "../../entities/book";
import { BookRepository } from "../../repositories/book-repository";


type Input = void;
interface Output {
  books: Book[]
};

export class GetBooksUseCase {
  constructor(
    private readonly bookRepo: BookRepository,
  ) {}

  async execute(_input: Input): Promise<Output> {
    try {
      const books = await this.bookRepo.getBooks();

      return {
        books
      }
    } catch {
      throw new InternalServerHTTPError(GET_BOOKS_ERROR);
    }
  }
}
