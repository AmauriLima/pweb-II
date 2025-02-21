import { IController } from "@/application/shared/http/interfaces/controller";
import { IHttpRequest, IHttpResponse } from "@/application/shared/http/interfaces/http";
import { HttpResponse } from "@/application/shared/http/response/http-response";
import { z } from "zod";
import { RemoveBookUsecase } from "./remove-book-use-case";

const schema = z.object({
  bookId: z.string().uuid(),
});

export class RemoveBookController implements IController {
  constructor(
    private readonly useCase: RemoveBookUsecase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { bookId } = schema.parse(request.params);

    await this.useCase.execute({bookId});

    return HttpResponse.noContent();
  }
}
