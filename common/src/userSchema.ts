import z from "zod"

const signInSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(8)
});
const signUpSchema = z.object({
  name: z.string().min(5).optional(),
  email: z.string().email(),
  password: z.string().min(8),
});
const userUpdateSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
});


export type signInInputSchema = z.infer<typeof signInSchema>;
export type SignUpInputSchema = z.infer<typeof signUpSchema>;
export type userUpdateInputDataSchema = z.infer<typeof userUpdateSchema>;

const userschemas = {
  signInSchema,
  signUpSchema,
  userUpdateSchema
};


export default userschemas


