import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const createLoanSwagger: Operation = {
  tags: [Tags.LOANS],
  summary: 'Cria um novo empréstimo',
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
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
        },
      },
    },
    '404': {
      description: 'Livro não encontrado ou Usuário não encontrado',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/MultipleErrorsResponse' },
          examples: {
            'Livro não encontrado': {
              value: { messages: ['Livro não encontrado!'] }
            },
            'Usuário não encontrado': {
              value: { messages: ['Usuário não encontrado'] }
            }
          }
        }
      }
    },
    '409': {
      description: 'Livro sem estoque ou Empréstimo em andamento',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/MultipleErrorsResponse' },
          examples: {
            'Livro sem estoque': {
              value: { messages: ['Livro sem estoque'] }
            },
            'Empréstimo em andamento': {
              value: { messages: ['Já existe um empréstimo desse livro pra esse usuário em andamento'] }
            }
          }
        }
      }
    },
  },
}
