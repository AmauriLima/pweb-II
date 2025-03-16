import { Account } from "@/application/modules/accounts/entities/account";
import { Roles } from "@/application/modules/accounts/entities/role";

export const account1 = new Account({
  name: "User 1",
  email: "user1@gmail.com",
  password: "Mudar@123",
  roleCode: Roles.ADMIN,
});

export const account2 = new Account({
  name: "User 2",
  email: "user2@gmail.com",
  password: "Mudar@123",
  roleCode: Roles.USER,
});
