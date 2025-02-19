import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const updateLoanSwagger: Operation = {
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
  summary: 'Atualiza um empréstimo (Em desenvolvimento)',
  description: 'Atualiza um empréstimo e retorna os dados do empréstimo atualizado',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/UpdateLoan' },
      },
    },
  },
  responses: {
    '201': {
      description: 'Empréstimo atualizado com sucesso',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/LoanResponse' },
        },
      },
    },
    '400': {
      description: 'Erro de validação',
    },
    '404': {
      description: 'Empréstimo não encontrado',
    },
  },
}
