import { z } from "zod";

export const getBooksSchema = z.object({
  page: z.coerce.number().optional(),
  perPage: z.coerce.number().optional(),
});

export type GetBooksSchemaType = z.infer<typeof getBooksSchema>;
