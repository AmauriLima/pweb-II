import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const ACCOUNT_NOT_FOUND_ERROR = 'Usuário não encontrado!';
export const REMOVE_ACCOUNT_ERROR = 'Erro ao excluir usuário!';

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
    '400': {
      description: 'Erro de validação',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
        },
      },
    },
    '401': { $ref: '#/components/responses/UnauthorizedError' },
    '404': {
      description: 'Conta não encontrada',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
          examples: {
            'Usuário não encontrado': {
              value: { messages: [ACCOUNT_NOT_FOUND_ERROR] }
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
            'Erro ao remover': {
              value: { messages: [REMOVE_ACCOUNT_ERROR] }
            }
          }
        },
      },
    },
  },
}
