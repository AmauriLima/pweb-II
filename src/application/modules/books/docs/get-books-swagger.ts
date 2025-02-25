import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const GET_BOOKS_ERROR = 'Erro ao listar livros';

export const getBooksSwagger: Operation = {
  tags: [Tags.BOOKS],
  summary: 'Lista todos os livros',
  description: 'Retorna uma lista com todos os livros cadastrados',
  responses: {
    '200': {
      description: 'Lista de livros retornada com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: { $ref: '#/components/schemas/BookResponse' },
          },
        },
      },
    },
    '401': { $ref: '#/components/responses/UnauthorizedError' },
    '500': {
      description: 'Erro interno do servidor',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
          examples: {
            'Erro ao listar': {
              value: { messages: [GET_BOOKS_ERROR] }
            }
          }
        },
      },
    }
  },
}
