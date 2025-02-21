import { generateSchema } from "@anatine/zod-openapi";
import { z } from "zod";

export const updateBookSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').optional(),
  description: z.string().min(1, 'Nome é obrigatório').optional(),
  coverUrl: z.string().url('Formato de url inválida').optional(),
  totalAmount: z.number().optional(),
});

export const updateBookOpenAPISchema = generateSchema(updateBookSchema);

export type UpdateBookSchema = z.infer<typeof updateBookSchema>;
