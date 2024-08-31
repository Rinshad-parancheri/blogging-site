import z from "zod"

const blogSchema = z.object({
  tittle: z.string().min(10).max(20),
  content: z.string().min(50).max(200)
})

const blogUpdateSchema = z.object({
  tittle: z.string().min(10).max(20).optional(),
  content: z.string().min(50).max(200).optional()
})



export type blogUpdateInputSchema = z.infer<typeof blogUpdateSchema>
export type blogInputSchema = z.infer<typeof blogSchema>


const blogSchemas = {
  blogSchema,
  blogUpdateSchema
}

export default blogSchemas
