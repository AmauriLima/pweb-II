import { IController } from "@/application/shared/http/interfaces/controller";
import { IHttpRequest, IHttpResponse } from "@/application/shared/http/interfaces/http";
import { HttpResponse } from "@/application/shared/http/response/http-response";
import { AccountMapper } from "../../mappers/account-mapper";
import { getAccountsSchema } from "./get-accounts-dto";
import { GetAccountsUseCase } from "./get-accounts-use-case";

export class GetAccountsController implements IController {
  constructor(
    private readonly useCase: GetAccountsUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { page, perPage } = getAccountsSchema.parse(request.query);

    const { accounts, totalAccounts } = await this.useCase.execute({
      page,
      perPage,
    });

    return HttpResponse.ok({
      body: {
        data: accounts.map(AccountMapper.toHttp),
        totalItems: totalAccounts,
      }
    });
  }
}
