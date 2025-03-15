import { z } from "zod";

export const getLoansSchema = z.object({
  accountId: z.string().uuid().optional(),
  limit: z.string().optional().transform((v) => Number(v)),
  cursor: z.string().uuid().optional().transform((v) => v === 'null' ? null : v),
});

export type GetLoansSchemaType = z.infer<typeof getLoansSchema>;
