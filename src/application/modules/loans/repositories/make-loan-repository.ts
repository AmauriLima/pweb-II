import { prismaClient } from "@/application/shared/clients/prisma-client";
import { LoanRepository } from "./loan-repository";
import { PrismaLoanRepository } from "./prisma-loan-repository";

export function makeLoanRepository(): LoanRepository {
  return new PrismaLoanRepository(prismaClient);
}
