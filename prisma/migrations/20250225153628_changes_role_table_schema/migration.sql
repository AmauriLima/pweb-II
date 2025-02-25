/*
  Warnings:

  - You are about to drop the column `role_id` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles_permissions` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[code]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role_code` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_role_id_fkey";

-- DropForeignKey
ALTER TABLE "roles_permissions" DROP CONSTRAINT "roles_permissions_permission_code_fkey";

-- DropForeignKey
ALTER TABLE "roles_permissions" DROP CONSTRAINT "roles_permissions_role_id_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "role_id",
ADD COLUMN     "role_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "code" TEXT NOT NULL;

-- DropTable
DROP TABLE "permissions";

-- DropTable
DROP TABLE "roles_permissions";

-- CreateIndex
CREATE UNIQUE INDEX "roles_code_key" ON "roles"("code");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_role_code_fkey" FOREIGN KEY ("role_code") REFERENCES "roles"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
