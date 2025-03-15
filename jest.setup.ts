import { PrismaClient } from "@prisma/client";
import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { execSync } from "child_process";

let container: StartedPostgreSqlContainer;
let prisma: PrismaClient;

beforeAll(async () => {
  container = await new PostgreSqlContainer().start();

  process.env.DATABASE_URL = container.getConnectionUri();

  prisma = new PrismaClient();

  execSync("npx prisma migrate deploy");
});

afterAll(async () => {
  await prisma.$disconnect();
  await container.stop();
});
