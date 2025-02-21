/*
  Warnings:

  - A unique constraint covering the columns `[account_id,book_id,return_date]` on the table `loans` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "loans_account_id_book_id_return_date_key" ON "loans"("account_id", "book_id", "return_date");
