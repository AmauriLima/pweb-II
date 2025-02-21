
import { IController } from "@/application/shared/http/interfaces/controller";
import { IHttpRequest, IHttpResponse } from "@/application/shared/http/interfaces/http";
import { z } from "zod";
import { updateBookSchema } from "./update-book-dto";
import { HttpResponse } from "@/application/shared/http/response/http-response";
import { BookMapper } from "../../mappers/book-mapper";
import { UpdateBookUseCase } from "./update-book-use-case";

const schema = z.object({
  bookId: z.string().uuid(),
})  

export class UpdateBookController implements IController{
  constructor(
    private readonly useCase: UpdateBookUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { bookId } = schema.parse(request.params);
    const parsedBody = updateBookSchema.parse(request.body);

    const { updatedBook } = await this.useCase.execute({
      bookId,
      ...parsedBody
    });

    return HttpResponse.created({
      body: BookMapper.toHttp(updatedBook)
    })
  }
 }
