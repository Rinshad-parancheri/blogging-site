import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { Enviroment } from "../binding";
import { getPrisma } from "../lib/prisma";
import verifyJwtToken from "../middleware/jwtAuth";
const app = new Hono<Enviroment>()

app.use("*", verifyJwtToken)
// app.post("/post", async (c) => {
//   try {
//     let prisma = getPrisma(c.env.DB_URL)
//
//     const Id = 
//     let isValidId = prisma.user.findUnique({
//       where:{
//         id: 
//       }
//     })
//       let payload = c.req.json()
//     prisma.blog.findUnique()
//   } catch (e) {
//
//   }
//
//
//
// })

export default app
