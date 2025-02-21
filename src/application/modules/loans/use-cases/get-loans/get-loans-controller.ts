import { IHttpRequest, IHttpResponse } from "@/application/shared/http/interfaces/http";
import { HttpResponse } from "@/application/shared/http/response/http-response";
import { GetLoansUseCase } from "./get-loans-use-case";
import { IController } from "@/application/shared/http/interfaces/controller";
import { LoanMapper } from "../../mappers/loan-mapper";

export class GetLoansController implements IController {
  constructor(
    private readonly useCase: GetLoansUseCase,
  ) {}

  async handle(_request: IHttpRequest): Promise<IHttpResponse> {
    const { loans } = await this.useCase.execute();

    return HttpResponse.ok({
      body: loans.map(LoanMapper.toHttp)
    });
  }
}