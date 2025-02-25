/*
  Warnings:

  - Changed the type of `role_code` on the `accounts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `code` on the `roles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'MANAGER', 'BOOK_MANAGER', 'USER_MANAGER', 'USER');

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_role_code_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "role_code",
ADD COLUMN     "role_code" "Roles" NOT NULL;

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "code",
ADD COLUMN     "code" "Roles" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "roles_code_key" ON "roles"("code");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_role_code_fkey" FOREIGN KEY ("role_code") REFERENCES "roles"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
