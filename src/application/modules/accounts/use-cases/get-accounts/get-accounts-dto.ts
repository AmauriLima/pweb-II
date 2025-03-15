import { z } from "zod";

export const getAccountsSchema = z.object({
  limit: z.string().optional().transform((v) => Number(v)),
  cursor: z.string().uuid().optional().transform((v) => v === 'null' ? null : v),
});

export type GetAccountsSchemaType = z.infer<typeof getAccountsSchema>;
