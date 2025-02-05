import { IHttpResponse, IHttpStatusCode } from '../interfaces/http';

interface IHttpResponseContructor extends Pick<IHttpResponse, 'body'> {}

export class HttpResponse {
  constructor() {}

  ok(response?: IHttpResponseContructor): IHttpResponse {
    return {
      statusCode: IHttpStatusCode.OK,
      ...response,
    };
  }

  created(response?: IHttpResponseContructor): IHttpResponse {
    return {
      statusCode: IHttpStatusCode.CREATED,
      ...response,
    };
  }

  noContent(): IHttpResponse {
    return {
      statusCode: IHttpStatusCode.NO_CONTENT,
    };
  }
}
