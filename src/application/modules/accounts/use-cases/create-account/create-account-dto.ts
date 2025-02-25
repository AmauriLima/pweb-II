import { generateSchema } from "@anatine/zod-openapi";
import { z } from "zod";
import { Roles } from "../../entities/account";


export const createAccountSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Formato de email inválido'),
  roleCode: z.nativeEnum(Roles, { required_error: 'A permissão do usuário é obrigatória' }),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
});

export const createAccountOpenAPISchema = generateSchema(createAccountSchema);

export type CreateAccountSchema = z.infer<typeof createAccountSchema>;
