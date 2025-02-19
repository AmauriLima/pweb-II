import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

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
  summary: 'Atualiza um livro (Em desenvolvimento)',
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
    '400': {
      description: 'Erro de validação',
    },
  },
}
