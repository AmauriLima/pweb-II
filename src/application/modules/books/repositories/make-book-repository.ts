import { prismaClient } from "@/application/shared/clients/prisma-client";
import { BookRepository } from "./book-repository";
import { PrismaBookRepository } from "./prisma-book-repository";

export function makeBookRepository(): BookRepository {
  return new PrismaBookRepository(prismaClient);
}
