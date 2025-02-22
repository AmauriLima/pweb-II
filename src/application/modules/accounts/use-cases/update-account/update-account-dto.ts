import { generateSchema } from "@anatine/zod-openapi";
import { z } from "zod";

export const updateAccountSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').optional(),
  email: z.string().email('Formato de email inválido').optional(),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres').optional(),
});

export const updateAccountOpenAPISchema = generateSchema(updateAccountSchema);

export type UpdateAccountSchema = z.infer<typeof updateAccountSchema>;
