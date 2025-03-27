import { generateSchema } from "@anatine/zod-openapi";
import { z } from "zod";

export const createLoanSchema = z.object({
  accountEmail: z.string().email(),
  bookId: z.string().uuid(),
  dueDate: z.string().datetime(),
});

export const createLoanOpenAPISchema = generateSchema(createLoanSchema);

export type CreateLoanSchema = z.infer<typeof createLoanSchema>;
