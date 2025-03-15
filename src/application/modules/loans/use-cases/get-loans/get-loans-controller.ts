import { IController } from "@/application/shared/http/interfaces/controller";
import { IHttpRequest, IHttpResponse } from "@/application/shared/http/interfaces/http";
import { HttpResponse } from "@/application/shared/http/response/http-response";
import { z } from "zod";
import { LoanMapper } from "../../mappers/loan-mapper";
import { GetLoansUseCase } from "./get-loans-use-case";
import { getLoansSchema } from "./get-loans-dto";

const schema = z.object({
  accountId: z.string().uuid().optional(),
});

export class GetLoansController implements IController {
  constructor(
    private readonly useCase: GetLoansUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { 
      accountId,
      cursor,
      limit
    } = getLoansSchema.parse(request.query);

    const { loans, nextCursor } = await this.useCase.execute({
      accountId,
      cursor,
      take: limit
    });

    return HttpResponse.ok({
      body: {
        data: loans.map(LoanMapper.toHttp),
        nextCursor,
      }
    });

    
  }




  
}
