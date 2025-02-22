-- DropIndex
DROP INDEX "loan_book_account_id";

-- CreateIndex
CREATE INDEX "loan_book_account_id" ON "loans"("account_id", "book_id", "return_date");
