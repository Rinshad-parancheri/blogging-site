import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { getPrisma } from '../lib/prisma'
import { hashPassword, verifyPassword } from '../utils/hashing'
import { HTTPException } from 'hono/http-exception'
import verifyJwtToken from '../middleware/jwtAuth'
import { Bindings } from '../binding'
import { updateData } from '../utils/type'

const app = new Hono<{ Bindings: Bindings }>()

app.post('/signup', async (c) => {


  try {
    const prisma = getPrisma(c.env.DB_URL)

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

  const prisma = getPrisma(c.env.DB_URL)
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
      c.env.JWT_SECRET,
      "HS256"
    )
  } catch (e) {
    throw new HTTPException(500, { message: `${e}` })
  }
  c.status(200)

  return c.json({
    token: token
  })

})


app.patch('/udpate', verifyJwtToken, async (c) => {

  const prisma = getPrisma(c.env.DB_URL)


  const data = await c.req.json();

  let payload = c.get('jwtPayload')
  let existingUser;
  try {
    existingUser = await prisma.user.findUnique({
      where: {
        email: payload.email
      }
    })

    if (!existingUser) {
      throw new HTTPException(401, { message: 'invalid email' })

    }
  } catch (error) {
    throw new HTTPException(500, { message: `${error}` })
  }
  const updateData: updateData = {};

  if (data.name !== undefined) {
    updateData.name = data.name;
  }
  if (data.email !== undefined) {
    updateData.email = data.email;
  }
  if (data.password !== undefined) {
    updateData.password = data.password;
  }

  await prisma.user.update({
    where: { email: existingUser.email },
    data: updateData,
  });
})
