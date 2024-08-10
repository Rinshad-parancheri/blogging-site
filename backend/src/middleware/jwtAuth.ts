import { Context, Next } from "hono"
import { Jwt } from "hono/utils/jwt"

async function verifyJwtToken(c: Context, next: Next) {
  const token = c.req.header('Authorization')?.split(' ')[1]
  if (!token) {
    return c.json({ error: 'No token provided' }, 401)
  }

  try {
    const decoded = await Jwt.verify(token, c.env.JWT_SECRET, "HS256")
    if (!decoded.exp) {
      c.json({ msg: 'not valued' }, 401)
    }
    c.set('user', decoded)
    await next()
  } catch (error) {
    return c.json({ error: 'Invalid token' }, 401)
  }
}


export default verifyJwtToken
