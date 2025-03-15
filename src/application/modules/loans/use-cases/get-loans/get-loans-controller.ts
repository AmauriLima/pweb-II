import { IController } from "@/application/shared/http/interfaces/controller";
import { IHttpRequest, IHttpResponse } from "@/application/shared/http/interfaces/http";
import { HttpResponse } from "@/application/shared/http/response/http-response";
import { z } from "zod";
import { LoanMapper } from "../../mappers/loan-mapper";
import { GetLoansUseCase } from "./get-loans-use-case";

const schema = z.object({
  accountId: z.string().uuid().optional(),
});

export class GetLoansController implements IController {
  constructor(
    private readonly useCase: GetLoansUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { 
      accountId } = schema.parse(request.query);

    const { loans } = await this.useCase.execute({ accountId });
 
    return HttpResponse.ok({
      body: loans.map(LoanMapper.toHttp)
    });
  }


  
}
