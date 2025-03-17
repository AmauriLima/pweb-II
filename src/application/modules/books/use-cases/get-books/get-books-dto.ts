import { z } from "zod";

export const getBooksSchema = z.object({
  limit: z.string().optional().transform((v) => v ? Number(v) : undefined),
  cursor: z.string().uuid().optional().transform((v) => v === 'null' ? null : v),
});

export type GetBooksSchemaType = z.infer<typeof getBooksSchema>;
