import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { sign } from 'hono/jwt'
import { Enviroment } from '../binding'
import { getPrisma } from '../lib/prisma'
import verifyJwtToken from '../middleware/jwtAuth'
import { hashPassword, verifyPassword } from '../utils/hashing'
import { UserUpdateInputDataSchema } from '@rinshadp014/blogging-site-common'
import userschemas from '@rinshadp014/blogging-site-common/dist/userSchema'
const app = new Hono<Enviroment>()


app.onError((e, c) => {
  console.error(e)
  if (e instanceof HTTPException) {
    return c.json({ error: e.message }, e.status);
  }

  return c.json({ error: 'Internal server error' }, 500);

})

app.post('/signup', async (c) => {
  try {
    const prisma = getPrisma(c.env.DB_URL)
    const data = await c.req.json()
    try {
      const parsedData = userschemas.signUpSchema.safeParse(data)
      if (!parsedData.success) {
        return c.json({
          msg: `invalid ${parsedData.error.issues[0].message}`
        }, 401)
      }
    } catch (e) {
      console.error(e)
      throw (e)
    }

    const { name, password, email } = data

    let existing = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    if (existing) {
      throw new HTTPException(401, { message: `email already taken` })
    }

    const hashedPassword = await hashPassword(password)
    try {
      const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
        },
        select: {
          name: true,
          email: true,
          id: true
        }
      })
      let token;
      let secret = c.env.JWT_SECRET
      try {
        token = await sign({
          userId: user.id,
          email: user.email,
        },
          secret,
          "HS256"
        )
      } catch (e) {
        throw e
      }

      return c.json({
        userName: user.name,
        email: user.email,
        token: token,

      }, 200)

    } catch (e) {
      console.error(e)
      throw new HTTPException(500, { message: 'user creation failed' })
    }
  } catch (e) {

    if (e instanceof HTTPException) {
      return c.json({ error: e.message }, e.status);
    }
    console.error(e)
    return c.json({ error: 'Internal server error' }, 500);

  }

})


app.post('/signin', async (c) => {

  try {
    const prisma = getPrisma(c.env.DB_URL)
    const data = await c.req.json()
    try {
      const parsedData = userschemas.signInSchema.safeParse(data)
      if (!parsedData.success) {
        return c.json({
          msg: `invalid ${parsedData.error.issues[0].message}`
        }, 401)
      }
    } catch (e) {
      throw (e)
    }
    const { password, email } = data


    let existingUser;
    try {
      existingUser = await prisma.user.findUnique({
        where: {
          email: email
        }
      })

      if (!existingUser) {
        throw new HTTPException(401, { message: 'Invalid email' })

      }
    } catch (e) {
      throw e
    }


    try {
      let isValidPassword = await verifyPassword(existingUser.password, password)
      if (!isValidPassword) {
        throw new HTTPException(401, { message: 'Incorrect password' })
      }
    } catch (e) {
      throw e
    }

    let token;
    let secret = c.env.JWT_SECRET
    try {
      token = await sign({
        userId: existingUser.id,
        email: existingUser.email,
      },
        secret,
        "HS256"
      )
    } catch (e) {
      throw e
    }



    return c.json({
      userName: existingUser.name,
      email: existingUser.email,
      token: token,

    }, 200)
  } catch (e) {
    if (e instanceof HTTPException) {
      return c.json({ error: e.message }, e.status);
    }
    console.error(e)
    return c.json({ error: 'Internal server error' }, 500);
  }
})


app.patch('/update', verifyJwtToken, async (c) => {
  try {

    const prisma = getPrisma(c.env.DB_URL)


    const data = await c.req.json();
    try {
      const parsedData = userschemas.userUpdateSchema.safeParse(data)
      if (!parsedData.success) {
        return c.json({
          msg: `invalid ${parsedData.error.issues[0].message}`
        }, 401)
      }
    } catch (e) {
      throw (e)
    }
    let payload = c.get('jwtPayload')
    let existingUser;
    try {
      existingUser = await prisma.user.findUnique({
        where: {
          email: payload.email,
        }
      })

      if (!existingUser) {
        throw new HTTPException(401, { message: 'invalid email' })

      }
    } catch (e) {
      throw e
    }
    data.password = await hashPassword(data.password)
    const updateData: UserUpdateInputDataSchema = {}

    if (data.name !== undefined && existingUser.name !== data.name) {
      updateData.name = data.name;
    }
    if (data.email !== undefined && existingUser.email !== data.email) {
      updateData.email = data.email;
    }
    if (data.password !== undefined && existingUser.password !== data.password) {
      updateData.password = data.password
    }
    try {
      let updatedData = await prisma.user.update({
        where: { email: existingUser.email },
        data: updateData,
      });
      if (updatedData) {
        return c.json({
          msg: "data updated successfully"
        }, 200)
      }

    } catch (e) {
      throw e
    }
  } catch (e) {
    if (e instanceof HTTPException) {
      return c.json({ error: e.message }, e.status);
    }
    console.error(e)
    return c.json({ error: 'Internal server error' }, 500);

  }
})

export default app
