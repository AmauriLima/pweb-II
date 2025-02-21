import { BadRequestHttpError } from "@/application/shared/http/errors/bad-request-http-error";
import { InternalServerHTTPError } from "@/application/shared/http/errors/internal-server-http-error";
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
    if (input.totalAmount < input.loanAmount) {
      throw new BadRequestHttpError('Quantidade total de livros não pode ser menos que quantidade emprestada!');
    }

    const book = new Book({
      name: input.name,
      coverUrl: input.coverUrl,
      description: input.description,
      loanAmount: input.loanAmount,
      totalAmount: input.totalAmount,
    });

    try {
      await this.bookRepo.createBook(book);

      return {
        book,
      }
    } catch {
      throw new InternalServerHTTPError('Erro ao criar livro');
    }
  }
}
