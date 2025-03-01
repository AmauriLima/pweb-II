import { IController } from "@/application/shared/http/interfaces/controller";
import { IHttpRequest, IHttpResponse } from "@/application/shared/http/interfaces/http";
import { HttpResponse } from "@/application/shared/http/response/http-response";
import { LoanMapper } from "../../mappers/loan-mapper";
import { GetLoansUseCase } from "./get-loans-use-case";

export class GetLoansController implements IController {
  constructor(
    private readonly useCase: GetLoansUseCase,
  ) {}

  async handle(_request: IHttpRequest): Promise<IHttpResponse> {
    const { loans } = await this.useCase.execute({});

    return HttpResponse.ok({
      body: loans.map(LoanMapper.toHttp)
    });
  }
}
