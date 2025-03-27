import { IController } from "@/application/shared/http/interfaces/controller";
import { IHttpRequest, IHttpResponse } from "@/application/shared/http/interfaces/http";
import { HttpResponse } from "@/application/shared/http/response/http-response";
import { LoanMapper } from "../../mappers/loan-mapper";
import { createLoanSchema } from "./create-loan-dto";
import { CreateLoanUseCase } from "./create-loan-use-case";

export class CreateLoanController implements IController {
  constructor(
    private readonly useCase: CreateLoanUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    console.log(request.body)
    const parsedBody = createLoanSchema.parse(request.body);
    console.log(parsedBody)

    const { loan } = await this.useCase.execute(parsedBody);

    return HttpResponse.created({
      body: LoanMapper.toHttp(loan)
    });
  }
}
