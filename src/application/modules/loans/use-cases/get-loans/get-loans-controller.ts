import { IController } from "@/application/shared/http/interfaces/controller";
import { IHttpRequest, IHttpResponse } from "@/application/shared/http/interfaces/http";
import { HttpResponse } from "@/application/shared/http/response/http-response";
import { LoanMapper } from "../../mappers/loan-mapper";
import { getLoansSchema } from "./get-loans-dto";
import { GetLoansUseCase } from "./get-loans-use-case";

export class GetLoansController implements IController {
  constructor(
    private readonly useCase: GetLoansUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const {
      accountId,
      page,
      perPage,
    } = getLoansSchema.parse(request.query);

    const { loans, totalLoans } = await this.useCase.execute({
      accountId,
      page,
      perPage
    });

    return HttpResponse.ok({
      body: {
        data: loans.map(LoanMapper.toHttp),
        totalItems: totalLoans,
      }
    });
  }
}
