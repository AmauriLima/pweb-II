import { generateSchema } from "@anatine/zod-openapi";
import { z } from "zod";

export const createBookSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().min(1, 'Nome é obrigatório'),
  coverUrl: z.string().url('Formato de url inválida'),
  totalAmount: z.number().optional().transform(v => v ?? 0),
});

export const createBookOpenAPISchema = generateSchema(createBookSchema);

export type CreateBookSchema = z.infer<typeof createBookSchema>;
