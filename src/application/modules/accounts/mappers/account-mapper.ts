import { generateSchema } from "@anatine/zod-openapi";
import { Prisma, Account as RawAccount, Roles as RawRoles } from "@prisma/client";
import { z } from "zod";
import { Account } from "../entities/account";
import { Roles } from "../entities/role";

export class AccountMapper {
  static toPersistence(domain: Account): Prisma.AccountCreateInput {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      role: {
        connect: {
          code: domain.roleCode as RawRoles,
        }
      },
      password: domain.password,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    }
  }

  static toDomain(data: RawAccount): Account {
    return new Account({
      id: data.id,
      name: data.name,
      email: data.email,
      roleCode: data.roleCode as Roles,
      password: data.password,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  static toHttp(domain: Account) {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      roleCode: domain.roleCode,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    }
  }
}

export const accountHttpSchema = generateSchema(
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    roleCode: z.nativeEnum(Roles),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
);
