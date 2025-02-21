import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const GET_LOANS_ERROR = 'Erro ao listar empréstimos';

export const getLoansSwagger: Operation = {
  tags: [Tags.LOANS],
  summary: 'Lista todos os empréstimos',
  description: 'Retorna uma lista com todos os empréstimos cadastrados',
  responses: {
    '200': {
      description: 'Lista de empréstimos retornada com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: { $ref: '#/components/schemas/LoanResponse' },
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
              value: { messages: [GET_LOANS_ERROR] }
            }
          }
        },
      },
    }
  },
}
