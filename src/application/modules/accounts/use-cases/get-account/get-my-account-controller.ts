

import { AccountMapper } from '@/application/modules/accounts/mappers/account-mapper';
import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { GetAccountUseCase } from './get-account-use-case';

const schema = z.object({
  id: z.string().uuid(),
});

export class GetMyAccountController implements IController {
  constructor(
    private readonly useCase: GetAccountUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { id } = schema.parse(request.account);

    const { account } = await this.useCase.execute({ accountId: id });

    return HttpResponse.ok({
      body: AccountMapper.toHttp(account)
    });
  }
}
