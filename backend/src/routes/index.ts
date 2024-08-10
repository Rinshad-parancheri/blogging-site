import { Hono } from "hono"
import { Enviroment } from "../binding"


const app = new Hono<Enviroment>()

import userRouter from './user'
import blogRouter from './blog'
import { Context, Next } from "hono"



app.route('/user', userRouter)
app.route('/blog', blogRouter)

export default app
