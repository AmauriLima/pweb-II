-- CreateIndex
CREATE INDEX "loan_account_id" ON "loans"("account_id");

-- CreateIndex
CREATE INDEX "loan_book_id" ON "loans"("book_id");

-- CreateIndex
CREATE INDEX "loan_book_account_id" ON "loans"("account_id", "book_id");
