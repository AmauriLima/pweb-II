import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const LOAN_NOT_FOUND = 'Empréstimo não encontrado!';
export const LOAN_ALREADY_CLOSED = 'Esse empréstimo já foi entregue!';
export const CLOSE_LOAN_ERROR = 'Erro ao receber empréstimo';

export const closeLoanSwagger: Operation = {
  tags: [Tags.LOANS],
  parameters: [
    {
      name: 'loanId',
      in: 'path',
      description: 'ID do empréstimo',
      required: true,
      schema: {
        type: 'string',
      },
    }
  ],
  summary: 'Fecha um empréstimo',
  description: 'Atualiza um empréstimo e retorna os dados do empréstimo atualizado',
  responses: {
    '201': {
      description: 'Empréstimo recebido com sucesso',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/LoanResponse' },
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
    '401': { $ref: '#/components/responses/UnauthorizedError' },
    '404': {
      description: 'Empréstimo não encontrado',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
          examples: {
            'Empréstimo não encontrado': {
              value: { messages: [LOAN_NOT_FOUND] }
            }
          }
        },
      },
    },
    '409': {
      description: 'Esse empréstimo já foi fechado',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
          examples: {
            'Empréstimo fechado': {
              value: { messages: [LOAN_ALREADY_CLOSED] }
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
            'Erro ao receber': {
              value: { messages: [CLOSE_LOAN_ERROR] }
            }
          }
        },
      },
    }
  },
}
