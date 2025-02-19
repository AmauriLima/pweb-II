import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const createLoanSwagger: Operation = {
  tags: [Tags.LOANS],
  summary: 'Cria um novo empréstimo (Em desenvolvimento)',
  description: 'Cria um empréstimo novo e retorna os dados do empréstimo cadastrada',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/CreateLoan' },
      },
    },
  },
  responses: {
    '201': {
      description: 'Empréstimo criado com sucesso',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/LoanResponse' },
        },
      },
    },
    '400': {
      description: 'Erro de validação',
    },
    '404': [
      {
        description: 'Livro não encontrado',
      },
      {
        description: 'Usuário não encontrado',
      },
    ],
    '409': {
      description: 'Já existe um empréstimo desse livro pra esse usuário',
    },
  },
}
