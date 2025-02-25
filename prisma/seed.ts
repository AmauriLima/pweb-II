import { env } from "@/application/config/env";
import { Roles } from "@/application/modules/accounts/entities/account";
import { Role } from "@/application/modules/accounts/entities/role";
import { makeCreateAccountUseCase } from "@/application/modules/accounts/use-cases/create-account/factories/make-create-account-use-case";
import { prismaClient } from "@/application/shared/clients/prisma-client";
import { Roles as RawRoles } from "@prisma/client";

async function seed() {
  const roles = Object.values(Roles).map((code) => new Role({
    code: code
  }));

  await prismaClient.role.createMany({
    data: roles.map((role) => ({
      id: role.id,
      code: role.code as RawRoles,
    })),
    skipDuplicates: true,
  });

  const createAccountUseCase = makeCreateAccountUseCase();

  const adminAlreadyExists = await prismaClient.account.findUnique({
    where:  { email: env.admin.email }
  });

  adminAlreadyExists ?? await createAccountUseCase.execute({
    name: env.admin.name,
    email: env.admin.email,
    password: env.admin.password,
    roleCode: Roles.ADMIN,
  });
}

seed();

