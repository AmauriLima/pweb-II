import { makeHashProvider } from "../make-hash-provider";

describe("Hash Provider", () => {
  let hashProvider = makeHashProvider();

  it("deve fazer o hashing de uma senha", async () => {
    const password = "password";

    const hashedPassword = await hashProvider.encrypt(password);

    expect(hashedPassword).not.toBe(password);
  });

  it("deve conseguir comparar uma senha com seu hash", async () => {
    const password = "password";

    const hashedPassword = await hashProvider.encrypt(password);

    const isValid = await hashProvider.compare(password, hashedPassword);

    expect(isValid).toBe(true);
  });

  it("deve falhar ao comparar uma senha com um hash inválido", async () => {
    const password = "password";

    const hashedPassword = await hashProvider.encrypt(password);

    const isValid = await hashProvider.compare("invalid_password", hashedPassword);

    expect(isValid).toBe(false);
  });
});
