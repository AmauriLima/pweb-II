import { z } from "zod";

export const createAccountSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Formato de email inválido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
});

export type CreateAccountSchema = z.infer<typeof createAccountSchema>;
