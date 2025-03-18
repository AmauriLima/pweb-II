import { Account } from "@/application/modules/accounts/entities/account";
import { Roles } from "@/application/modules/accounts/entities/role";
import { HashProvider } from "@/application/shared/providers/hash-provider/hash-provider";
import { makeHashProvider } from "@/application/shared/providers/hash-provider/make-hash-provider";
import { makeTokenProvider } from "@/application/shared/providers/token-provider/make-token-provider";
import { TokenProvider } from "@/application/shared/providers/token-provider/token-provider";
import { UnauthorizedHTTPError } from "../../errors/unauthorized-http-error";
import { IHttpRequest } from "../../interfaces/http";
import { IData } from "../../interfaces/middleware";
import { AuthenticationMiddleware, INVALID_TOKEN_ERROR } from "../authentication-middleware";
import { makeAuthenticationMiddleware } from "../factories/make-authentication-middleware";

describe("Authentication Middleware", () => {
  let tokenProvider: TokenProvider;
  let hashProvider: HashProvider;
  let authenticationMiddleware: AuthenticationMiddleware;

  beforeEach(() => {
    tokenProvider = makeTokenProvider("test_secret");
    hashProvider = makeHashProvider();
    authenticationMiddleware = makeAuthenticationMiddleware(tokenProvider);
  });

  it("deve validar um token válido com sucesso", async () => {
    const account = new Account({
      name: "John Doe",
      email: "email@gmail.com",
      password: await hashProvider.encrypt("password"),
      roleCode: Roles.ADMIN,
    });

    const token = tokenProvider.generateToken({ sub: account.id, role: account.roleCode, expiresIn: "1h" });

    const response = await authenticationMiddleware.handle({ headers: { authorization: `Bearer ${token}` } } as unknown as IHttpRequest) as IData;

    expect(response?.data.account).toEqual({ id: account.id, role: account.roleCode });
  });

  it("deve dar erro ao tentar validar um token inválido", async () => {
    const token = "invalid_token";

    await expect(authenticationMiddleware.handle({ headers: { authorization: `Bearer ${token}` } } as unknown as IHttpRequest)).rejects.toThrow(new UnauthorizedHTTPError(INVALID_TOKEN_ERROR));

    await expect(authenticationMiddleware.handle({ headers: { authorization: `${token}` } } as unknown as IHttpRequest)).rejects.toThrow(new UnauthorizedHTTPError(INVALID_TOKEN_ERROR));

    await expect(authenticationMiddleware.handle({ headers: { } } as unknown as IHttpRequest)).rejects.toThrow(new UnauthorizedHTTPError(INVALID_TOKEN_ERROR));
  });
});
