import { generateSchema } from "@anatine/zod-openapi";
import { Prisma, Account as RawAccount } from "@prisma/client";
import { z } from "zod";
import { Account } from "../entities/account";

export class AccountMapper {
  static toPersistence(domain: Account): Prisma.AccountCreateInput {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
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
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
);
