import { ZodSchema } from "zod";
import z from "zod"
const signInSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(8)

})

const blogSchema = z.object({
  title: z.string().min(20).max(50),
  conten: z.string().min(500).max(2000)

})

const signUpSchema = z.object({
  name: z.string().min(5).optional(),
  email: z.string().email(),
  passwrd: z.string().min(8),
})

export type SiginInput = z.infer<typeof signInSchema>
export type blogSchema = z.infer<typeof blogSchema>
export type SignupSchema = z.infer<typeof signUpSchema>


const schemas = {
  signUpSchema,
  signInSchema,
  blogSchema
}

export default schemas
