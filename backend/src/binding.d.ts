import { PrismaClient } from "@prisma/client/extension";

export type Enviroment = {
  Bindings: {
    JWT_SECRET: string;
    DB_URL: string;
  },
  Variables: {
    prisma: PrismaClient;
  }
}



