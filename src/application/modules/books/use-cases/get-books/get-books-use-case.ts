import { Book } from "../../entities/book";
import { BookRepository } from "../../repositories/book-repository";


interface Input {
  page?: number;
  perPage?: number;
};

interface Output {
  books: Book[];
  totalBooks: number;
};

export class GetBooksUseCase {
  constructor(
    private readonly bookRepo: BookRepository,
  ) {}

  async execute({ page, perPage }: Input): Promise<Output> {
    const { books, totalBooks } = await this.bookRepo.getBooks({ page, perPage });

    return {
      books,
      totalBooks,
    }
  }
}
