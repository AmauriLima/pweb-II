import { ConflictHTTPError } from "@/application/shared/http/errors/conflict-http-error";
import { NotFoundHTTPError } from "@/application/shared/http/errors/not-found-http-error";
import { IUseCase } from "@/application/shared/http/interfaces/use-case";
import { HashProvider } from "@/application/shared/providers/hash-provider/hash-provider";
import { ACCOUNT_NOT_FOUND_ERROR, UPDATE_ACCOUNT_CONFLICT_ERROR } from "../../docs/update-account-swagger";
import { Account } from "../../entities/account";
import { Roles } from "../../entities/role";
import { AccountRepository } from "../../repositories/account-repository";
import { makeValidateRoleHierarchyUseCase } from "../validate-role-hierarchy/factories/make-validate-role-hierarchy";
import { UpdateAccountSchema } from "./update-account-dto";

type IInput = UpdateAccountSchema & {
  accountId: string;
  accountRole: Roles;
};

interface IOutput {
  updatedAccount: Account;
}


export class UpdateAccountUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly accountRepo: AccountRepository,
    private readonly hashProvider: HashProvider,
  ) {}

  async execute({ accountId, accountRole, ...input }: IInput): Promise<IOutput> {
    if (input.roleCode) {
      const validateRoleHierarchy = makeValidateRoleHierarchyUseCase();
      await validateRoleHierarchy.execute({ accountRole, roleCode: input.roleCode });
    }

    const account = await this.accountRepo.getAccountById(accountId);

    if (!account) {
      throw new NotFoundHTTPError(ACCOUNT_NOT_FOUND_ERROR);
    }

    if (input.email) {
      const accountByEmail = await this.accountRepo.getAccountByEmail(input.email);

      if (accountByEmail && accountByEmail.id !== accountId) {
        throw new ConflictHTTPError(UPDATE_ACCOUNT_CONFLICT_ERROR);
      }
    }

    if (input.password) {
      input.password = await this.hashProvider.encrypt(input.password);
    }

    const updatedAccount = new Account({
      id: account.id,
      name: input.name || account.name,
      email: input.email || account.email,
      password: input.password || account.password,
      roleCode: input.roleCode || account.roleCode,
      createdAt: account.createdAt,
    });

    await this.accountRepo.updateAccount(updatedAccount);

    return { updatedAccount };
  }
}
