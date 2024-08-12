import { Hono } from "hono";
import { Enviroment } from "../binding";
import { getPrisma } from "../lib/prisma";
import verifyJwtToken from "../middleware/jwtAuth";
import { blogUpdateSchema } from "../utils/type";
import { stringBufferToString } from "hono/utils/html";
import { useId } from "hono/jsx";
const app = new Hono<Enviroment>()

app.use("*", verifyJwtToken)
app.post('/post', async (c) => {

  try {
    const blog = await c.req.json()
    const payload = c.get("jwtPayload")

    const { content, title } = blog
    const { userId } = payload
    const prisma = getPrisma(c.env.DB_URL)

    try {
      const createdBlog = await prisma.blog.create({
        data: {
          content: content,
          title: title,
          authorId: userId,
          published: true
        },
        select: {
          id: true
        }
      })
      if (createdBlog.id) {
        c.json({
          msg: 'blog updated Successfully',
          blogId: createdBlog.id
        }, 200)
      }
    } catch (e) {
      throw e
    }
  } catch (e) {
    console.error(e)

    return c.json('internal server error', 500)
  }
})


app.patch('/update', async (c) => {
  try {
    const blog = await c.req.json()
    const payload = c.get("jwtPayload")


    const userId: string = payload.userId

    const prisma = getPrisma(c.env.DB_URL)
    const updateData: blogUpdateSchema = {}

    if (!blog.content == undefined) {
      updateData.content = blog.content
    }
    if (!blog.title == undefined) {
      updateData.title = blog.title
    }
    try {
      prisma.blog.update({
        where: {
          id: blog.id,
          authorId: userId,
        },
        data: updateData,
      })
      return c.json({
        msg: `updation completed`

      }, 200)
    } catch (e) {

    }
  } catch (e) {
    console.error(e)

    return c.json('internal server error', 500)
  }
})

app.get("/getblog/:id", async (c) => {
  try {
    const id = parseInt(c.req.param('id'))


    const userId: string = c.get('jwtPayload')
    const prisma = getPrisma(c.env.DB_URL)

    const blog = prisma.blog.findUnique({
      where: {
        id: id,
        authorId: userId
      }
    })

    return c.json({
      blog: blog,
    }, 500)

  } catch (e) {
    console.error(e);
    return c.json('internal server error', 500)

  }
})

app.get('/getblogs', async (c) => {
  try {
    const prisma = getPrisma(c.env.DB_URL)

    const blogs = prisma.blog.findMany({
      select: {
        title: true,
        id: true,
        content: true,
      }
    })

    return c.json({
      blogs: blogs
    }, 200)

  } catch (e) {
    console.error(e)
    return c.json('internal server error')
  }
})
export default app
