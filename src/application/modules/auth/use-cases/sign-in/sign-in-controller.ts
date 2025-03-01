
import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { signInSchema } from './sign-in-dto';
import { SignInUseCase } from './sing-in-use-case';


export class SignInController implements IController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async handle({ body }: IHttpRequest): Promise<IHttpResponse> {
    const { email, password } = signInSchema.parse(body);

    const { accessToken, role } = await this.signInUseCase.execute({ email, password });

    return HttpResponse.ok({
      body: {
        accessToken,
        role,
      },
    });
  }
}
