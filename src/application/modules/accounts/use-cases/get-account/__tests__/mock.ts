
import { Account } from "../../../entities/account";
import { Roles } from "../../../entities/role";

export const account1 = new Account({
  name: "User 1",
  email: "user1@gmail.com",
  password: "123456",
  roleCode: Roles.ADMIN,
});

export const account2 = new Account({
  name: "User 2",
  email: "user2@gmail.com",
  password: "123456",
  roleCode: Roles.USER,
})

export const accounts = [account1, account2]
