
import { TokenProvider } from '../../providers/token-provider/token-provider';
import { UnauthorizedHTTPError } from '../errors/unauthorized-http-error';
import { IHttpRequest, IHttpResponse } from '../interfaces/http';
import { IData, IMiddleware } from '../interfaces/middleware';

export const INVALID_TOKEN_ERROR = 'Token de acesso inválido';

export class AuthenticationMiddleware implements IMiddleware {
  constructor(
    private readonly tokenProvider: TokenProvider,
  ) {}

  async handle({ headers }: IHttpRequest): Promise<IHttpResponse | IData> {
    const { authorization } = headers;

    if (!authorization) {
      throw new UnauthorizedHTTPError(INVALID_TOKEN_ERROR);
    }

    try {
      const [bearer, token] = authorization.split(' ');

      if (bearer !== 'Bearer') {
        throw new UnauthorizedHTTPError(INVALID_TOKEN_ERROR);
      }

      const payload = this.tokenProvider.verifyToken(token);

      return {
        data: {
          account: {
            id: payload.sub,
            role: payload.role,
          },
        },
      };
    } catch {
      throw new UnauthorizedHTTPError(INVALID_TOKEN_ERROR);
    }
  }
}
