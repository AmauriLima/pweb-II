import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const LOAN_NOT_FOUND = 'Empréstimo não encontrado!';
export const LOAN_ALREADY_CLOSED = 'Esse empréstimo já foi entregue!';

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
    '404': {
      description: 'Empréstimo não encontrado',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
          example: { messages: [LOAN_NOT_FOUND] }
        },
      },
    },
    '409': {
      description: 'Esse empréstimo já foi fechado',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
          example: { messages: [LOAN_ALREADY_CLOSED] }
        },
      },
    },
  },
}
