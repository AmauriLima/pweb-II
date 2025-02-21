import { IController } from "@/application/shared/http/interfaces/controller";
import { IHttpRequest, IHttpResponse } from "@/application/shared/http/interfaces/http";
import { HttpResponse } from "@/application/shared/http/response/http-response";
import { z } from "zod";
import { LoanMapper } from "../../mappers/loan-mapper";
import { CloseLoanUseCase } from "./close-loan-use-case";

const schema = z.object({
  loanId: z.string().uuid(),
});

export class CloseLoanController implements IController {
  constructor(
    private readonly useCase: CloseLoanUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { loanId } = schema.parse(request.params);

    const { updatedLoan } = await this.useCase.execute({ loanId });

    return HttpResponse.created({
      body: LoanMapper.toHttp(updatedLoan)
    });
  }
}
