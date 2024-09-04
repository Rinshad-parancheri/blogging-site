import { Hono } from 'hono'
import mainRouter from "./routes/index"
import { cors } from 'hono/cors'

const app = new Hono()

app.use("/app/v1/*", cors())
app.route('/app/v1', mainRouter)


export default app
