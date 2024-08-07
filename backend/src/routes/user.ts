import { Hono } from 'hono'
import { jwt, sign, verify } from 'hono/jwt'
import { getPrisma } from '../lib/prisma'
import { hashPassword, verifyPassword } from '../utils/hashing'
import { HTTPException } from 'hono/http-exception'

type Bindings = {
  DATABASE_URL: string
  JWT_SECRET: string
}

enum StatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500
}

const app = new Hono<{ Bindings: Bindings }>()

app.post('/signup', async (c) => {


  try {
    const prisma = getPrisma(c.env.DATABASE_URL)

    const { name, password, email } = await c.req.json()
    const hashedPassword = await hashPassword(password)


    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
      select: {
        name
      }
    })

    c.status(201)

    return c.json({
      msg: `${user.name} account created successfully`
    })
  } catch (e) {
    throw new HTTPException(500, { message: `${e}` })
  }

})


app.post('/signin', async (c) => {



  const prisma = getPrisma(c.env.DATABASE_URL)

  const { name, password, email } = await c.req.json()

  let existingUser;
  try {
    existingUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (!existingUser) {
      throw new HTTPException(401, { message: 'invalid email' })

    }
  } catch (error) {
    throw new HTTPException(500, { message: `${error}` })
  }


  try {
    let isValidPassword = await verifyPassword(existingUser.password, password)
    if (!isValidPassword) {
      throw new HTTPException(401, { message: 'password incorect' })
    }
  } catch (error) {
    throw new HTTPException(500, { message: `${error}` })
  }

  let token;
  try {
    token = sign({
      userId: existingUser.id,
      email: existingUser.email
    },
      c.env.JWT_SECRET
    )
  } catch (e) {
    throw new HTTPException(500, { message: `${e}` })
  }
  c.status(200)

  return c.json({
    token: token
  })

})
