import { generateSchema } from "@anatine/zod-openapi";
import { z } from "zod";

export const createLoanSchema = z.object({
  accountId: z.string().uuid(),
  bookId: z.string().uuid(),
  dueDate: z.string().datetime(),
  returnDate: z.string().datetime().optional(),
});

export const createLoanOpenAPISchema = generateSchema(createLoanSchema);

export type CreateLoanSchema = z.infer<typeof createLoanSchema>;
