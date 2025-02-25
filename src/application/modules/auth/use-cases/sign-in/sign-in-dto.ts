import { generateSchema } from "@anatine/zod-openapi";
import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8),
});

export const signInOpenAPISchema = generateSchema(signInSchema);

export type SignInSchema = z.infer<typeof signInSchema>;
