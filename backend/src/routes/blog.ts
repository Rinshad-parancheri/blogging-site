import { Hono } from "hono";
import { Enviroment } from "../binding";
import { getPrisma } from "../lib/prisma";
import verifyJwtToken from "../middleware/jwtAuth";
import { BlogUpdateInputSchema } from "@rinshadp014/blogging-site-common"
import blogSchemas from "@rinshadp014/blogging-site-common/dist/blogSchema";
const app = new Hono<Enviroment>()

app.use("*", verifyJwtToken)
app.post('/post', async (c) => {

  try {
    const payload = await c.get("jwtPayload")
    const blog = await c.req.json()

    const parsedData = blogSchemas.blogSchema.safeParse(blog)
    if (!parsedData.success) {
      console.log(parsedData.error.issues[0])
      return c.json({
        msg: `invalid ${parsedData.error.issues[0].message}`
      }, 401)
    }
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
        return c.json({
          msg: 'blog posted Successfully',
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

    try {
      const parsedData = blogSchemas.blogUpdateSchema.safeParse(blog)
      if (!parsedData.success) {
        console.log(parsedData.error)
        return c.json({
          msg: `invalid ${parsedData.error.issues[0].message}`
        }, 401)
      }
    } catch (e) {
      throw (e)
    }
    const userId: string = payload.userId

    const prisma = getPrisma(c.env.DB_URL)
    const updateData: BlogUpdateInputSchema = {}


    if (blog.content !== undefined) {
      updateData.content = blog.content;
    }
    if (blog.title !== undefined) {
      updateData.tittle = blog.tittle;
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
    const id = c.req.param('id')

    if (!id) {
      return c.json({
        msg: `id not provided`,
      },
        401)
    }
    const prisma = getPrisma(c.env.DB_URL)

    const blog = await prisma.blog.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        content: true,
        id: true,
        createdAt: true,
        title: true,
        author: {
          select: {
            name: true
          }
        }
      }
    })
    if (!blog) {
      return c.json({
        msg: "couldn't find the blog",
      }, 401)
    }
    return c.json({
      blog: blog,
    }, 200)

  } catch (e) {

    console.error(e);
    return c.json('internal server error', 500)

  }
})

app.get('/getblogs', async (c) => {
  try {
    const prisma = getPrisma(c.env.DB_URL)

    const blogs = await prisma.blog.findMany({

      select: {
        title: true,
        id: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            name: true
          }
        }
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
