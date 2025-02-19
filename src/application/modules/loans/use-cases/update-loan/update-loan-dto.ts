import { generateSchema } from "@anatine/zod-openapi";
import { z } from "zod";

export const updateLoanSchema = z.object({
  dueDate: z.string().datetime().optional(),
  returnDate: z.string().datetime().optional(),
});

export const updateLoanOpenAPISchema = generateSchema(updateLoanSchema);

export type UpdateLoanSchema = z.infer<typeof updateLoanSchema>;
