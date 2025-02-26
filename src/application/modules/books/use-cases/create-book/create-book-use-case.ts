import { IUseCase } from "@/application/shared/http/interfaces/use-case";
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

    await this.bookRepo.createBook(book);

    return {
      book,
    }
  }
}
