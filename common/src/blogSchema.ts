import z from "zod"

const blogSchema = z.object({
  title: z.string().min(20).max(100),
  content: z.string().min(200).max(10000)
})

const blogUpdateSchema = z.object({
  title: z.string().min(20).max(100),
  content: z.string().min(200).max(10000)
})



export type BlogUpdateInputSchema = z.infer<typeof blogUpdateSchema>
export type BlogInputSchema = z.infer<typeof blogSchema>


const blogSchemas = {
  blogSchema,
  blogUpdateSchema
}

export default blogSchemas
