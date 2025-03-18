import { Roles } from "@/application/modules/accounts/entities/role";
import { JsonWebTokenError } from "jsonwebtoken";
import { makeTokenProvider } from "../make-token-provider";

describe("Token Provider", () => {
  const tokenProvider = makeTokenProvider('test_secret');

  it("deve gerar um token", async () => {
    const payload = { id: "123" };

    const token = tokenProvider.generateToken({ sub: payload.id, role: Roles.ADMIN, expiresIn: "1h" });

    expect(token).toBeTruthy();
  });

  it("deve verificaar um token", async () => {
    const payload = { id: "123" };

    const token = tokenProvider.generateToken({ sub: payload.id, role: Roles.ADMIN, expiresIn: "1h" });

    const decoded = tokenProvider.verifyToken(token);

    expect(decoded.sub).toBe(payload.id);
    expect(decoded.role).toBe(Roles.ADMIN);
  });

  it("deve falhar ao verificar um token inválido", async () => {
    const token = "token inválido";

    expect(() => tokenProvider.verifyToken(token)).toThrow(JsonWebTokenError);
  });

  it("deve falhar ao verificar um token com um segredo inválido", async () => {
    const token = tokenProvider.generateToken({sub: '12323', role: Roles.ADMIN});

    const invalidTokenProvider = makeTokenProvider('invalid_secret');

    expect(() => invalidTokenProvider.verifyToken(token)).toThrow(JsonWebTokenError);
  });

  it("deve falhar ao verificar um token com um segredo expirado", async () => {
    const token = tokenProvider.generateToken({sub: '12323', role: Roles.ADMIN, expiresIn: '1s'});
    await new Promise(resolve => setTimeout(resolve, 1000));

    expect(() => tokenProvider.verifyToken(token)).toThrow(JsonWebTokenError);
  });
});
