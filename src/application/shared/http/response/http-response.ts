import { IHttpResponse, IHttpStatusCode } from '../interfaces/http';

interface IHttpResponseContructor extends Pick<IHttpResponse, 'body'> {}

export class HttpResponse {
  static ok(response?: IHttpResponseContructor): IHttpResponse {
    return {
      statusCode: IHttpStatusCode.OK,
      ...response,
    };
  }

  static created(response?: IHttpResponseContructor): IHttpResponse {
    return {
      statusCode: IHttpStatusCode.CREATED,
      ...response,
    };
  }

  static noContent(): IHttpResponse {
    return {
      statusCode: IHttpStatusCode.NO_CONTENT,
    };
  }
}
