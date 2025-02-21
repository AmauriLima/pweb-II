import { IController } from "@/application/shared/http/interfaces/controller";
import { IHttpRequest, IHttpResponse } from "@/application/shared/http/interfaces/http";
import { HttpResponse } from "@/application/shared/http/response/http-response";
import { BookMapper } from "../../mappers/book-mapper";
import { createBookSchema } from "./create-book-dto";
import { CreateBookUseCase } from "./create-book-use-case";

export class CreateBookController implements IController {
  constructor(
    private readonly useCase: CreateBookUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const parsedBody = createBookSchema.parse(request.body);

    const { book } = await this.useCase.execute(parsedBody);

    return HttpResponse.created({
      body: BookMapper.toHttp(book),
    });
  }
}
