import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";
import { ACCOUNT_NOT_FOUND_ERROR } from "../../accounts/docs/update-account-swagger";

export const CREATE_LOAN_ERROR = 'Erro ao criar empréstimo';
export const BOOK_OUT_ERROR = 'Livro sem estoque!';
export const LOAN_IN_PROGRESS_ERROR = 'Você já tem um empréstimo desse livro em andamento, devolva primeiro para poder fazer outro';

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
    '401': { $ref: '#/components/responses/UnauthorizedError' },
    '404': {
      description: 'Livro não encontrado ou Usuário não encontrado',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/MultipleErrorsResponse' },
          examples: {
            'Livro não encontrado': {
              value: { messages: [BOOK_OUT_ERROR] }
            },
            'Usuário não encontrado': {
              value: { messages: [ACCOUNT_NOT_FOUND_ERROR] }
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
              value: { messages: [BOOK_OUT_ERROR] }
            },
            'Empréstimo em andamento': {
              value: { messages: [LOAN_IN_PROGRESS_ERROR] }
            }
          }
        }
      }
    },
    '500': {
      description: 'Erro interno do servidor',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
          examples: {
            'Erro ao criar': {
              value: { messages: [CREATE_LOAN_ERROR] }
            }
          }
        },
      },
    }
  },
}
