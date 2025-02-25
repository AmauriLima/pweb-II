import { Tags } from "@/@types/tags";
import { generateSchema } from "@anatine/zod-openapi";
import { Operation } from "swagger-jsdoc";
import { z } from "zod";
import { Roles } from "../../accounts/entities/account";

export const INVALID_CREDENTIALS_ERROR = 'Credenciais inválidas';
export const SIGN_IN_ERROR = 'Erro ao fazer login!';

export const signInHttpSchema = generateSchema(z.object({
  accessToken: z.string().jwt(),
  role: z.nativeEnum(Roles),
}));

export const signInSwagger: Operation = {
  tags: [Tags.AUTH],
  summary: 'Fazer login',
  description: 'Valida e-mail e senha do usuário e retorna um token de acesso',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/SignIn' },
      },
    },
  },
  responses: {
    '200': {
      description: 'Login efetuado com sucesso',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/SignInResponse' },
        },
      },
    },
    '400': {
      description: 'Erro de validação',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
        },
      },
    },
    '401': {
      description: 'E-mail ou senha inválidos',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
          examples: {
            'Credenciais inválidas': {
              value: { messages: [INVALID_CREDENTIALS_ERROR] }
            }
          }
        },
      },
    },
    '500': {
      description: 'Erro interno do servidor',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
          examples: {
            'Erro ao logar': {
              value: { messages: [SIGN_IN_ERROR] }
            }
          }
        },
      },
    }
  },
}
