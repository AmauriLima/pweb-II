import { z } from "zod";

export const getLoansSchema = z.object({
  accountId: z.string().uuid().optional(),
  page: z.coerce.number().optional(),
  perPage: z.coerce.number().optional(),
});

export type GetLoansSchemaType = z.infer<typeof getLoansSchema>;
