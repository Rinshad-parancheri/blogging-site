import { Hono } from 'hono'
import { sign, verify } from 'hono/jwt'
import { getPrisma } from '../lib/prisma'


type Bindings = {
  DATABASE_URL: string
  JWT_SECRET: string
}


const app = new Hono<{ Bindings: Bindings }>()

app.post('/signup', async (c) => {

  const prisma = getPrisma(c.env.DATABASE_URL)


})
