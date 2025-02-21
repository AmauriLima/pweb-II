import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

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
  },
}
