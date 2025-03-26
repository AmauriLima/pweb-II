import { z } from "zod";

export const getAccountsSchema = z.object({
  page: z.coerce.number().optional(),
  perPage: z.coerce.number().optional(),
});

export type GetAccountsSchemaType = z.infer<typeof getAccountsSchema>;
