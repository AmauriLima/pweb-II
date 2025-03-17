import { IController } from "@/application/shared/http/interfaces/controller";
import { IHttpRequest, IHttpResponse } from "@/application/shared/http/interfaces/http";
import { HttpResponse } from "@/application/shared/http/response/http-response";
import { BookMapper } from "../../mappers/book-mapper";
import { getBooksSchema } from "./get-books-dto";
import { GetBooksUseCase } from "./get-books-use-case";

export class GetBooksController implements IController {
  constructor(
    private readonly useCase: GetBooksUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { cursor, limit } = getBooksSchema.parse(request.query);

    const { books, nextCursor } = await this.useCase.execute({
      cursor,
      take: limit
    });

    return HttpResponse.ok({
      body: {
        data: books.map(BookMapper.toHttp),
        nextCursor,
      }
    });
  }
}
