import { generateSchema } from "@anatine/zod-openapi";
import { z } from "zod";

export const bookHttpSchema = generateSchema(
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string(),
    coverUrl: z.string().url(),
    totalAmount: z.number(),
    loanAmount: z.number(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
);
