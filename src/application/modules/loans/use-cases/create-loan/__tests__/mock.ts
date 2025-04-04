import { Account } from "@/application/modules/accounts/entities/account";
import { Roles } from "@/application/modules/accounts/entities/role";
import { Book } from "@/application/modules/books/entities/book";
import { Loan } from "../../../entities/loan";

export const account1 = new Account({
  id: "0552387b-81c0-4e9b-818a-759ea36eb6f2",
    name: "teste",
    email: "teste@gmail.com",
    password: "123456",
    roleCode: Roles.USER,
    createdAt: new Date(),
    updatedAt: new Date(),
});

export const book1 = new Book({
  id: "8d95f878-a920-49be-8a05-e3a78fb85844",
  name: "Learn TypeScript",
  description: "A comprehensive guide to TypeScript.",
  coverUrl: "http://example.com/cover.jpg",
  totalAmount: 10,
  loanAmount: 5,
});


export const book2 = new Book({
  name: "Learn TypeScript",
  description: "A comprehensive guide to TypeScript.",
  coverUrl: "http://example.com/cover.jpg",
  totalAmount: 5,
  loanAmount: 5,
});

export const loan1 = new Loan({
      id: "1abea528-42cb-4ce9-a987-74eb1c71dc77",
      accountId: "0552387b-81c0-4e9b-818a-759ea36eb6f2",
      accountName: "teste",
      bookId: "8d95f878-a920-49be-8a05-e3a78fb85844",
      bookName: "Learn TypeScript",
      dueDate: new Date("2025-03-30"),
      returnDate: null });

export const loan2 = new Loan({
      id: "1abea528-42cb-4ce9-a987-74eb1c71dc78",
        accountId: "0552387b-81c0-4e9b-818a-759ea36eb6f2",
        accountName: "teste",
        bookId: "8d95f878-a920-49be-8a05-e3a78fb85844",
        bookName: "Learn TypeScript",
        dueDate: new Date("2025-03-30"),
        returnDate: null });




