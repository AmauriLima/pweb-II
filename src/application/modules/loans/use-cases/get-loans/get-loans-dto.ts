import { z } from "zod";

export const getLoansSchema = z.object({
  accountId: z.string().uuid().optional(),
  limit: z.string().optional().transform((v) => v ? Number(v) : undefined),
  cursor: z.string().uuid().optional().transform((v) => v === 'null' ? null : v),
});

export type GetLoansSchemaType = z.infer<typeof getLoansSchema>;
