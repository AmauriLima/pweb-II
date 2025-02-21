import { InternalServerHTTPError } from "@/application/shared/http/errors/internal-server-http-error";
import { IUseCase } from "@/application/shared/http/interfaces/use-case";
import { CREATE_BOOK_ERROR } from "../../docs/create-book-swagger";
import { Book } from "../../entities/book";
import { BookRepository } from "../../repositories/book-repository";
import { CreateBookSchema } from "./create-book-dto";

type IInput = CreateBookSchema;
interface IOutput {
  book: Book;
}

export class CreateBookUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly bookRepo: BookRepository,
  ) {}

  async execute(input: IInput): Promise<IOutput> {
    const book = new Book({
      name: input.name,
      coverUrl: input.coverUrl,
      description: input.description,
      totalAmount: input.totalAmount,
      loanAmount: 0,
    });

    try {
      await this.bookRepo.createBook(book);

      return {
        book,
      }
    } catch {
      throw new InternalServerHTTPError(CREATE_BOOK_ERROR);
    }
  }
}
