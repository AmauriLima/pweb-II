import { ZodError } from "zod";
import { BadRequestHttpError } from "../../errors/bad-request-http-error";
import { ConflictHTTPError } from "../../errors/conflict-http-error";
import { ForbiddenHTTPError } from "../../errors/forbidden-http-error";
import { INTERNAL_SERVER_HTTP_ERROR_DEFAULT_MESSAGE, InternalServerHTTPError } from "../../errors/internal-server-http-error";
import { NotFoundHTTPError } from "../../errors/not-found-http-error";
import { UnauthorizedHTTPError } from "../../errors/unauthorized-http-error";
import { IHttpStatusCode } from "../../interfaces/http";
import { makeHandleApplicationErrorMiddleware } from "../factories/make-handle-application-error-middleware";
import { HandleApplicationErrorMiddleware } from "../handle-application-error-middleware";

describe("HandleApplicationErrorMiddleware", () => {
  let middleware: HandleApplicationErrorMiddleware;

  beforeEach(() => {
    middleware = makeHandleApplicationErrorMiddleware();
  });

  it("deve retornar erro de bad request formatado quando o erro for uma instancia de zod error com path", () => {
    const error = new ZodError([
      {
        message: "Invalid email",
        path: ["email"],
        code: 'custom',
      },
    ]);

    const response = middleware.handle(error);

    expect(response).toEqual({
      statusCode: IHttpStatusCode.BAD_REQUEST,
      body: {
        messages: ["Invalid email. Erro em: email"],
      },
    });
  });


  it("deve retornar erro de bad request quando o erro for uma instancia de zod error", () => {
    const error = new ZodError([
      {
        message: "Invalid email",
        path: [],
        code: 'custom',
      },
    ]);

    const response = middleware.handle(error);

    expect(response).toEqual({
      statusCode: IHttpStatusCode.BAD_REQUEST,
      body: {
        messages: ["Invalid email"],
      },
    });
  });

  it("deve retornar o status code e message correta para um http error", () => {
    const notfoundError = new NotFoundHTTPError("Not Found");
    const badRequestError = new BadRequestHttpError("Bad Request");
    const conflictError = new ConflictHTTPError("Conflict");
    const forbiddenError = new ForbiddenHTTPError("Forbidden");
    const unauthorizedError = new UnauthorizedHTTPError("Unauthorized");
    const internalError = new InternalServerHTTPError("Internal");

    const response = middleware.handle(notfoundError);
    expect(response).toEqual({
      statusCode: IHttpStatusCode.NOT_FOUND,
      body: {
        messages: ["Not Found"],
      },
    });

    const response2 = middleware.handle(badRequestError);
    expect(response2).toEqual({
      statusCode: IHttpStatusCode.BAD_REQUEST,
      body: {
        messages: ["Bad Request"],
      },
    });

    const response3 = middleware.handle(conflictError);
    expect(response3).toEqual({
      statusCode: IHttpStatusCode.CONFLICT,
      body: {
        messages: ["Conflict"],
      },
    });

    const response4 = middleware.handle(forbiddenError);
    expect(response4).toEqual({
      statusCode: IHttpStatusCode.FORBIDDEN,
      body: {
        messages: ["Forbidden"],
      },
    });

    const response5 = middleware.handle(unauthorizedError);
    expect(response5).toEqual({
      statusCode: IHttpStatusCode.UNAUTHORIZED,
      body: {
        messages: ["Unauthorized"],
      },
    });

    const response6 = middleware.handle(internalError);
    expect(response6).toEqual({
      statusCode: IHttpStatusCode.INTERNAL_SERVER_ERROR,
      body: {
        messages: ["Internal"],
      },
    });
  });

  it("deve retornar um InternalServerError com mensagem padrão para erros genéricos", () => {
    const error = new Error("Unexpected error");

    const response = middleware.handle(error);

    expect(response).toEqual({
      statusCode: IHttpStatusCode.INTERNAL_SERVER_ERROR,
      body: {
        messages: [INTERNAL_SERVER_HTTP_ERROR_DEFAULT_MESSAGE],
      },
    });
  });

  it("deve retornar um InternalServerError com mensagem padrão para erros desconhecidos", () => {
    const error = "Some unknown error";

    const response = middleware.handle(error);

    expect(response).toEqual({
      statusCode: IHttpStatusCode.INTERNAL_SERVER_ERROR,
      body: {
        messages: [INTERNAL_SERVER_HTTP_ERROR_DEFAULT_MESSAGE],
      },
    });
  });


});
