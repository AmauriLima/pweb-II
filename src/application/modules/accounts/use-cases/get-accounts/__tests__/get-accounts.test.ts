import { app } from "@/main/express/app";
import { PrismaClient } from "@prisma/client";
import request from "supertest";
import { Account } from "../../../entities/account";
import { Roles } from "../../../entities/role";

const prisma = new PrismaClient();

describe("GET /accounts", () => {
  beforeAll(async () => {

    const account1 = new Account({
      name: "User 1",
      email: "user1@gmail.com",
      password: "123456",
      roleCode: Roles.ADMIN,
    });
    const account2 = new Account({
      name: "User 2",
      email: "user2@gmail.com",
      password: "123456",
      roleCode: Roles.USER,
    });

    await prisma.account.createMany({
      data: [account1, account2]
    });
  });

  afterAll(async () => {
    await prisma.account.deleteMany();
    await prisma.$disconnect();
  });

  it("deve retornar uma lista de contas", async () => {
    const response = await request(app).get("/accounts");

    expect(response.status).toBe(200);
    expect(response.body.body).toHaveLength(2);
    expect(response.body.body[0]).toHaveProperty("email");
  });
});
