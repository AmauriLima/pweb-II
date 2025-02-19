import { IController } from "@/application/shared/http/interfaces/controller";
import { IHttpRequest, IHttpResponse } from "@/application/shared/http/interfaces/http";
import { HttpResponse } from "@/application/shared/http/response/http-response";
import { AccountMapper } from "../../mappers/account-mapper";
import { GetAccountUsecase } from "./get-accounts-use-case";

export class GetAccountsController implements IController {
  constructor(
    private readonly useCase: GetAccountUsecase,
  ) {}

  async handle(_request: IHttpRequest): Promise<IHttpResponse> {
    const { accounts } = await this.useCase.execute();

    return HttpResponse.ok({
      body: accounts.map(AccountMapper.toHttp)
    });
  }
}
