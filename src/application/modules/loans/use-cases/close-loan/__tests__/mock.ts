import { Account } from "@/application/modules/accounts/entities/account";
import { Roles } from "@/application/modules/accounts/entities/role";
import { Book } from "@/application/modules/books/entities/book";
import { Loan } from "../../../entities/loan";

export const account1 = new Account({
  name: "account",
  email: "account@gmail.com",
  password: 'Mudar@123',
  roleCode: Roles.USER,
});

export const book1 = new Book({
  id: '0195a1f8-8f72-76fb-b615-145b2eda1c88',
  name: "Learn TypeScript",
  description: "A comprehensive guide to TypeScript.",
  coverUrl: "http://example.com/cover.jpg",
  totalAmount: 10,
  loanAmount: 5,
});

export const loan1 = new Loan({
  accountId: account1.id,
  accountName: account1.name,
  bookId: book1.id,
  bookName: book1.name,
  dueDate: new Date("2025-03-30"),
  returnDate: null
});

export const loan2 = new Loan({
  accountId: account1.id,
  accountName: account1.name,
  bookId: book1.id,
  bookName: book1.id,
  dueDate: new Date("2025-03-30"),
  returnDate: new Date(),
});

export const loans = [loan1, loan2];




