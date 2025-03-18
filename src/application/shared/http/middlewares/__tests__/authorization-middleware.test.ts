import { Roles } from "@/application/modules/accounts/entities/role";
import { HashProvider } from "@/application/shared/providers/hash-provider/hash-provider";
import { makeHashProvider } from "@/application/shared/providers/hash-provider/make-hash-provider";
import { ForbiddenHTTPError } from "../../errors/forbidden-http-error";
import { IHttpRequest } from "../../interfaces/http";
import { ACCESS_FORBIDDEN_ERROR, AuthorizationMiddleware } from "../authorization-middleware";
import { makeAuthorizationMiddleware } from "../factories/make-authorization-middleware";

describe("Authorization middleware", () => {
  let hashProvider: HashProvider;
  let authorizationMiddleware: AuthorizationMiddleware;

  beforeEach(() => {
    hashProvider = makeHashProvider();
    authorizationMiddleware = makeAuthorizationMiddleware([]);
  });

  it("deve lançar um erro caso não seja passada uma account", async () => {
    await expect(authorizationMiddleware.handle({} as unknown as IHttpRequest)).rejects.toThrow(new ForbiddenHTTPError(ACCESS_FORBIDDEN_ERROR));
  });

  it("deve dar erro caso a role da account não seja permitida", async () => {
    authorizationMiddleware = makeAuthorizationMiddleware([Roles.BOOK_MANAGER]);

    await expect(authorizationMiddleware.handle({ account: { role: Roles.USER } } as unknown as IHttpRequest)).rejects.toThrow(new ForbiddenHTTPError(ACCESS_FORBIDDEN_ERROR));
  });

  it("deve dar sucesso caso a role da account seja permitida", async () => {
    authorizationMiddleware = makeAuthorizationMiddleware([Roles.BOOK_MANAGER]);

    const response = await authorizationMiddleware.handle({ account: { role: Roles.BOOK_MANAGER } } as unknown as IHttpRequest);

    expect(response).toEqual({ data: {} });
  });
});
