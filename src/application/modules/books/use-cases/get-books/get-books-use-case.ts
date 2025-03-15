import { Book } from "../../entities/book";
import { BookRepository } from "../../repositories/book-repository";


interface Input {
  cursor?: string | null;
  take?: number;
};

interface Output {
  books: Book[];
  nextCursor: string | null;
};

export class GetBooksUseCase {
  constructor(
    private readonly bookRepo: BookRepository,
  ) {}

  async execute({ cursor, take }: Input): Promise<Output> {
    const { books, nextCursor } = cursor === null
      ? { books: [], nextCursor: null }
      : await this.bookRepo.getBooks({ cursor, take });

    return {
      books,
      nextCursor,
    }
  }
}
