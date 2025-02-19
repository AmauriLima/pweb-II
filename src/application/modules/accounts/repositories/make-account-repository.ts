import { prismaClient } from "@/application/shared/clients/prisma-client";
import { PrismaAccountRepository } from "./prisma-account-respository";

export function makeAccountRepository() {
  return new PrismaAccountRepository(prismaClient);
}
