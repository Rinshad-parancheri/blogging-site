import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { sign } from 'hono/jwt'
import { Enviroment } from '../binding'
import { getPrisma } from '../lib/prisma'
import verifyJwtToken from '../middleware/jwtAuth'
import { hashPassword, verifyPassword } from '../utils/hashing'
import { updateData, userUpdateData } from '../utils/type'

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

    const { name, password, email } = await c.req.json()
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
          name: true
        }
      })

      c.status(201)

      return c.json({
        msg: `${user.name} account created successfully`
      })
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
    const { name, password, email } = await c.req.json()

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
    try {
      token = await sign({
        userId: existingUser.id,
        email: existingUser.email,
      },
        c.env.JWT_SECRET,
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
    const updateData: userUpdateData = {}

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
