import { PrismaClient } from "@prisma/client";

declare global {
  var client: PrismaClient | undefined;
}

const client = global.client || new PrismaClient();

// development라면 global을 나중에 설정해 주어야 한다.
// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
if (process.env.NODE_ENV !== "production")
  global.client = client;

export default client;
