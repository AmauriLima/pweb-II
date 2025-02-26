import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";
import { BOOK_NOT_FOUND_ERROR } from "./delete-book-swagger";

export const updateBookSwagger: Operation = {
  tags: [Tags.BOOKS],
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
  summary: 'Atualiza um livro',
  description: 'Atualiza um livro e retorna os dados do livro atualizado',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/UpdateBook' },
      },
    },
  },
  responses: {
    '201': {
      description: 'Livro atualizado com sucesso',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/BookResponse' },
        },
      },
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
