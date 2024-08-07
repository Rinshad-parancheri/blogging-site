import { Hono } from "hono"

const app = new Hono()

import userRouter from './user'

app.route('/user', userRouter)

export default app
