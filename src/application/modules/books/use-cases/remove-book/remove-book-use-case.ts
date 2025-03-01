import { NotFoundHTTPError } from "@/application/shared/http/errors/not-found-http-error";
import { IUseCase } from "@/application/shared/http/interfaces/use-case";
import { BOOK_NOT_FOUND_ERROR } from "../../docs/delete-book-swagger";
import { BookRepository } from "../../repositories/book-repository";

interface IInput {
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
      throw new NotFoundHTTPError(BOOK_NOT_FOUND_ERROR);
    }

    await this.bookRepo.removeBook(bookId);
  }
}
