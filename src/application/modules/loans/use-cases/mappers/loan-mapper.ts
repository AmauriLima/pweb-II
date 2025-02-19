import { generateSchema } from "@anatine/zod-openapi";
import { z } from "zod";

export const loanHttpSchema = generateSchema(
  z.object({
    loanId: z.string().uuid(),
    accountId: z.string().uuid(),
    bookId: z.string().uuid(),
    dueDate: z.string().datetime(),
    returnDate: z.string().datetime(),
  })
);

