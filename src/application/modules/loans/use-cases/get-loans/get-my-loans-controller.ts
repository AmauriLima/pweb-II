import { IController } from "@/application/shared/http/interfaces/controller";
import { IHttpRequest, IHttpResponse } from "@/application/shared/http/interfaces/http";
import { HttpResponse } from "@/application/shared/http/response/http-response";
import { LoanMapper } from "../../mappers/loan-mapper";
import { getLoansSchema } from "./get-loans-dto";
import { GetLoansUseCase } from "./get-loans-use-case";

export class GetMyLoansController implements IController {
  constructor(
    private readonly useCase: GetLoansUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const {
      page,
      perPage,
    } = getLoansSchema.parse(request.query);

    const { loans, totalLoans } = await this.useCase.execute({ accountId: request.account?.id, page, perPage });

    return HttpResponse.ok({
      body: {
        totalItems: totalLoans,
        data: loans.map(LoanMapper.toHttp),
      },
    });
  }

}
