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
    const books = await this.bookRepo.getBooks();

    return {
      books
    }
  }
}
