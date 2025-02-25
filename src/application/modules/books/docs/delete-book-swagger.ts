import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const BOOK_NOT_FOUND_ERROR = 'Livro não encontrado!';
export const REMOVE_BOOK_ERROR = 'Erro ao excluir livro!';

export const deleteBookSwagger: Operation = {
  tags: [Tags.BOOKS],
  security: [
    { BearerAuth: [] }
  ],
  parameters: [
    {
      name: 'bookId',
      in: 'path',
      description: 'ID do livro',
      required: true,
      schema: {
        type: 'string',
      },
    }
  ],
  summary: 'Remove um livro',
  description: 'Está operação ainda não foi implementada',
  responses: {
    '204': {
      description: 'Livro removido com sucesso',
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
      description: 'Livro não encontrado',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
          examples: {
            'Livro não encontrado': {
              value: { messages: [BOOK_NOT_FOUND_ERROR] }
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
            'Erro ao excluir': {
              value: { messages: [REMOVE_BOOK_ERROR] }
            }
          }
        },
      },
    }
  },
}
