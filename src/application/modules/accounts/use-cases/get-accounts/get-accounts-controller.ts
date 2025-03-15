import { IController } from "@/application/shared/http/interfaces/controller";
import { IHttpRequest, IHttpResponse } from "@/application/shared/http/interfaces/http";
import { HttpResponse } from "@/application/shared/http/response/http-response";
import { AccountMapper } from "../../mappers/account-mapper";
import { GetAccountsUseCase } from "./get-accounts-use-case";
import { getAccountsSchema } from "./get-accounts-dto";



export class GetAccountsController implements IController {
  constructor(
    private readonly useCase: GetAccountsUseCase,
  ) {}
 
  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const {
            cursor, limit
          } = getAccountsSchema.parse(request.query);

      const { accounts, nextCursor } = await this.useCase.execute({
      cursor,
      take: limit
    });

    return HttpResponse.ok({
      body: {
        data: accounts.map(AccountMapper.toHttp),
        nextCursor,
      }
    });
  }
}
