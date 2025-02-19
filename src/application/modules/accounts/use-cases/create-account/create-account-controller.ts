import { IController } from "@/application/shared/http/interfaces/controller";
import { IHttpRequest, IHttpResponse } from "@/application/shared/http/interfaces/http";
import { HttpResponse } from "@/application/shared/http/response/http-response";
import { AccountMapper } from "../../mappers/account-mapper";
import { createAccountSchema } from "./create-account-dto";
import { CreateAccountUseCase } from "./create-account-use-case";

export class CreateAccountController implements IController {
  constructor(
    private readonly useCase: CreateAccountUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const parsedBody = createAccountSchema.parse(request.body);

    const { account } = await this.useCase.execute(parsedBody);

    return HttpResponse.created({
      body: AccountMapper.toHttp(account)
    });
  }
}
