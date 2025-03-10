import { ZodError } from 'zod';

import { HttpError } from '../errors/http-error';
import { INTERNAL_SERVER_HTTP_ERROR_DEFAULT_MESSAGE } from '../errors/internal-server-http-error';
import { IErrorMiddleware } from '../interfaces/error-middleware';
import { IHttpResponse, IHttpStatusCode } from '../interfaces/http';

export class HandleApplicationErrorMiddleware implements IErrorMiddleware {
  handle(error: unknown): IHttpResponse {
    if (error instanceof ZodError) {
      const zodErrors = JSON.parse(error.message);
      const zodErrorMessages = zodErrors.map((e: any) => {
        const message = e.message;

        if (e.path.length) {
          return message + '. Erro em: ' + e.path;
        } else {
          return message;
        }
      });

      return {
        statusCode: IHttpStatusCode.BAD_REQUEST,
        body: {
          messages: zodErrorMessages,
        }
      };
    }

    if (error instanceof HttpError) {
      return {
        statusCode: error.statusCode,
        body: {
          messages: [error.message],
        }
      };
    }

    if (error instanceof Error) {
      return {
        statusCode: IHttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
          messages: [INTERNAL_SERVER_HTTP_ERROR_DEFAULT_MESSAGE, error.message],
        }
      };
    }

    return {
      statusCode: IHttpStatusCode.INTERNAL_SERVER_ERROR,
      body: {
        messages: [INTERNAL_SERVER_HTTP_ERROR_DEFAULT_MESSAGE]
      }
    };
  }
}
