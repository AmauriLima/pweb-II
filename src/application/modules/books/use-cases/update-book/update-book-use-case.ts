import { NotFoundHTTPError } from "@/application/shared/http/errors/not-found-http-error";
import { IUseCase } from "@/application/shared/http/interfaces/use-case";
import { BookRepository } from "../../repositories/book-repository";
import { UpdateBookSchema } from "./update-book-dto";
import { InternalServerHTTPError } from "@/application/shared/http/errors/internal-server-http-error";
import { Book } from "../../entities/book";

type IInput =  UpdateBookSchema & {
    bookId: string;
  }

interface IOutput {
    updatedBook: Book;
}

export class UpdateBookUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly bookRepo: BookRepository,
  ) {}

  async execute({ bookId, ...input }: IInput): Promise<IOutput> {
    const book = await this.bookRepo.getBookById(bookId);

    if (!book) {
      throw new NotFoundHTTPError('Livro não encontrado!');
    }

    const updatedBook = new Book({
      id: book.id,
      name: input.name || book.name,
      description: input.description || book.description,
        coverUrl: input.coverUrl || book.coverUrl,
        totalAmount: input.totalAmount || book.totalAmount,
        loanAmount: input.loanAmount || book.loanAmount,
    });

    try {
      await this.bookRepo.updateBook(updatedBook);

      return { updatedBook };
    } catch {
      throw new InternalServerHTTPError('Erro ao atualizar usuário');
    }
  }
}