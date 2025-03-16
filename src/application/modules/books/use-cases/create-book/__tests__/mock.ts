import { Roles } from "@/application/modules/accounts/entities/role";
import { Book } from "../../../entities/book";
import { Account } from "@/application/modules/accounts/entities/account";

export const book1 = new Book({
    name: "book1",
    description: "description1",
    coverUrl: "https://example.com/cover.jpg",
    totalAmount: 10,
    loanAmount: 0,
});
export const book2 = new Book({
    name: "book2",
    description: "description2",
    coverUrl: "https://example.com/cover.jpg",
    totalAmount: 10,
    loanAmount: 0,
});

export const account1 = new Account({
  name: "User 1",
  email: "user1@gmail.com",
  password: "123456",
  roleCode: Roles.USER,
});