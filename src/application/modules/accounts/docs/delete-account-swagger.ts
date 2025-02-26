import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const ACCOUNT_NOT_FOUND_ERROR = 'Usuário não encontrado!';

export const deleteAccountSwagger: Operation = {
  tags: [Tags.ACCOUNTS],
  parameters: [
    {
      name: 'accountId',
      in: 'path',
      description: 'ID da conta',
      required: true,
      schema: {
        type: 'string',
      },
    }
  ],
  summary: 'Remove uma conta',
  description: 'Está operação ainda não foi implementada',
  responses: {
    '204': {
      description: 'Conta removida com sucesso',
    },
    '404': {
      description: 'Conta não encontrada',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
          example: { messages: [ACCOUNT_NOT_FOUND_ERROR] }
        },
      },
    },
  },
}
