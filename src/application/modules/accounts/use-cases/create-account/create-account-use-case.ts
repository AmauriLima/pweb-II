import { ConflictHTTPError } from "@/application/shared/http/errors/conflict-http-error";
import { InternalServerHTTPError } from "@/application/shared/http/errors/internal-server-http-error";
import { IUseCase } from "@/application/shared/http/interfaces/use-case";
import { HashProvider } from "@/application/shared/providers/hash-provider/hash-provider";
import { CREATE_ACCOUNT_CONFLICT_ERROR, CREATE_ACCOUNT_ERROR } from "../../docs/create-account-swagger";
import { Account, Roles } from "../../entities/account";
import { AccountRepository } from "../../repositories/account-repository";
import { makeValidateRoleHierarchyUseCase } from "../validate-role-hierarchy/factories/make-validate-role-hierarchy";
import { CreateAccountSchema } from "./create-account-dto";

type IInput = CreateAccountSchema & {
  accountRole: Roles,
};
interface IOutput {
  account: Account;
};

export class CreateAccountUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly accountRepo: AccountRepository,
    private readonly hashProvider: HashProvider,
  ) {}

  async execute({ email, name, password, roleCode, accountRole }: IInput): Promise<IOutput> {
    const validateRoleHierarchy = makeValidateRoleHierarchyUseCase();
    await validateRoleHierarchy.execute({ accountRole, roleCode });

    const accountAlreadyExists = await this.accountRepo.getAccountByEmail(email);

    if (accountAlreadyExists) {
      throw new ConflictHTTPError(CREATE_ACCOUNT_CONFLICT_ERROR);
    }

    const encryptedPassword = await this.hashProvider.encrypt(password);

    const account = new Account({
      name,
      email,
      roleCode,
      password: encryptedPassword,
    });

    try {
      await this.accountRepo.createAccount(account);

      return {
        account,
      }
    } catch {
      throw new InternalServerHTTPError(CREATE_ACCOUNT_ERROR);
    }

  }
}
