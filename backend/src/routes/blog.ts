import { PrismaClient } from "@prisma/client/extension"
import { withAccelerate } from "@prisma/extension-accelerate"
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { Enviroment } from "../binding";
import verifyJwtToken from "../middleware/jwtAuth";
import { getPrisma } from "../lib/prisma";
const app = new Hono<Enviroment>()


// app.post("/post", verifyJwtToken, async (c) => {
//
//   let payload = c.req.json()
//   let prisma = getPrisma(c.env.DB_URL)
//
//
//   try {
//
//
//   }
//   try {
//     await prisma({
//       data:
//     })
//   } catch (e) {
//     throw new HTTPException(500, { message: `${e}` })
//   }
//
//
// })

export default app
