import { IController } from "@/application/shared/http/interfaces/controller";
import { IHttpRequest, IHttpResponse } from "@/application/shared/http/interfaces/http";
import { HttpResponse } from "@/application/shared/http/response/http-response";
import { z } from "zod";
import { RemoveAccountUsecase } from "./remove-account-use-case";

const schema = z.object({
  accountId: z.string().uuid(),
});

export class RemoveAccountController implements IController {
  constructor(
    private readonly useCase: RemoveAccountUsecase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { accountId } = schema.parse(request.params);

    await this.useCase.execute({accountId});

    return HttpResponse.noContent();
  }
}
