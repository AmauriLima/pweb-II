

import { IHttpStatusCode } from '../interfaces/http';
import { type ErrorMessage, HttpError } from './http-error';

export const INTERNAL_SERVER_HTTP_ERROR_DEFAULT_MESSAGE =
  'Ocorreu um erro interno ao tentar executar essa funcionalidade, por favor, entre em contato com o suporte!'

export class InternalServerHTTPError extends HttpError {
  constructor(message: ErrorMessage = INTERNAL_SERVER_HTTP_ERROR_DEFAULT_MESSAGE) {
    super(IHttpStatusCode.INTERNAL_SERVER_ERROR, message);
  }
}
