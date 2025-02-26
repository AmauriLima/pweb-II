import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const BOOK_NOT_FOUND_ERROR = 'Livro não encontrado!';

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
    '404': {
      description: 'Livro não encontrado',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
          example: { messages: [BOOK_NOT_FOUND_ERROR] }
        },
      },
    },
  },
}
