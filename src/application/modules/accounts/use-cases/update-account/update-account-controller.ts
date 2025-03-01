import { IController } from "@/application/shared/http/interfaces/controller";
import { IHttpRequest, IHttpResponse } from "@/application/shared/http/interfaces/http";
import { HttpResponse } from "@/application/shared/http/response/http-response";
import { z } from "zod";
import { AccountMapper } from "../../mappers/account-mapper";
import { updateAccountSchema } from "./update-account-dto";
import { UpdateAccountUseCase } from "./update-account-use-case";

const schema = z.object({
  accountId: z.string().uuid(),
})

export class UpdateAccountController implements IController {
  constructor(
    private readonly useCase: UpdateAccountUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { accountId } = schema.parse(request.params);
    const parsedBody = updateAccountSchema.parse(request.body);

    const { updatedAccount } = await this.useCase.execute({
      accountId,
      accountRole: request.account!.role,
      ...parsedBody
    });

    return HttpResponse.created({
      body: AccountMapper.toHttp(updatedAccount)
    })
  }
}
