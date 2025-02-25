import { IUseCase } from "@/application/shared/http/interfaces/use-case";

import { ForbiddenHTTPError } from "@/application/shared/http/errors/forbidden-http-error";
import { roleHierarchy, Roles } from "../../entities/account";

interface IInput {
  accountRole: Roles;
  roleCode: Roles;
};

type IOutput = void;

export const VALIDATE_ROLE_HIERARCHY_ERROR =
  "Você não tem permissão para criar um essa usuário com essa permissão.";

export class ValidateRoleHierarchyUseCase implements IUseCase<IInput, IOutput> {
  async execute({ accountRole, roleCode }: IInput): Promise<void> {
    if (!roleHierarchy[accountRole].includes(roleCode)) {
      throw new ForbiddenHTTPError(VALIDATE_ROLE_HIERARCHY_ERROR);
    }
  }
}
