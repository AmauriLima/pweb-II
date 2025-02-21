import { InternalServerHTTPError } from "@/application/shared/http/errors/internal-server-http-error";
import { NotFoundHTTPError } from "@/application/shared/http/errors/not-found-http-error";
import { IUseCase } from "@/application/shared/http/interfaces/use-case";
import { BookRepository } from "../../repositories/book-repository";

type IInput = {
  bookId: string;
};

type IOutput = void;

export class RemoveBookUsecase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly bookRepo: BookRepository,
  ) {}

  async execute({ bookId }: IInput): Promise<IOutput> {
    const book = await this.bookRepo.getBookById(bookId);

    if (!book) {
      throw new NotFoundHTTPError('Livro não encontrado');
    }

    try {
      await this.bookRepo.removeBook(bookId);
    } catch {
      throw new InternalServerHTTPError('Erro ao excluir usuário');
    }

  }
}
