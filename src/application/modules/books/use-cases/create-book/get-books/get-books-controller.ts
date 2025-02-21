import { IHttpRequest, IHttpResponse } from "@/application/shared/http/interfaces/http";
import { HttpResponse } from "@/application/shared/http/response/http-response";
import { BookMapper } from "../../../mappers/book-mapper";
import { GetBooksUseCase } from "./get-books-use-case";
import { IController } from "@/application/shared/http/interfaces/controller";

export class GetBooksController implements IController {
  constructor(
    private readonly useCase: GetBooksUseCase,
  ) {}

  async handle(_request: IHttpRequest): Promise<IHttpResponse> {
    const { books } = await this.useCase.execute();

    return HttpResponse.ok({
      body: books.map(BookMapper.toHttp)
    });
  }
}