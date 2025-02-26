import { IController } from "@/application/shared/http/interfaces/controller";
import { IHttpRequest, IHttpResponse } from "@/application/shared/http/interfaces/http";
import { HttpResponse } from "@/application/shared/http/response/http-response";
import { LoanMapper } from "../../mappers/loan-mapper";
import { GetLoansUseCase } from "./get-loans-use-case";

export class GetMyLoansController implements IController {
  constructor(
    private readonly useCase: GetLoansUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { loans } = await this.useCase.execute({ accountId: request.account?.id });

    return HttpResponse.ok({
      body: loans.map(LoanMapper.toHttp)
    });
  }
}
