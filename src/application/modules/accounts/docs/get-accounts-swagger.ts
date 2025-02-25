import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const GET_ACCOUNTS_ERROR = 'Erro ao listar usuários';

export const getAccountsSwagger: Operation = {
  tags: [Tags.ACCOUNTS],
  summary: 'Lista todas as contas',
  description: 'Retorna uma lista com todas as contas cadastradas',
  responses: {
    '200': {
      description: 'Lista de contas retornada com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: { $ref: '#/components/schemas/AccountResponse' },
          },
        },
      },
    },
    '500': {
      description: 'Erro interno do servidor',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
          examples: {
            'Erro ao listar': {
              value: { messages: [GET_ACCOUNTS_ERROR] }
            }
          }
        },
      },
    }
  },
}
