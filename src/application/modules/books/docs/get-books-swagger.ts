import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const getBooksSwagger: Operation = {
  tags: [Tags.BOOKS],
  summary: 'Lista todos os livros',
  description: 'Retorna uma lista com todos os livros cadastrados',
  parameters: [
    {
      name: "page",
      in: "query",
      description: "Página que deve ser mostrada",
      required: false,
      schema: {
        type: "integer",
        default: 1
      },
    },
    {
      name: "perPage",
      in: "query",
      description: "Número de livros por página",
      required: false,
      schema: {
        type: "integer",
        default: 10,
      },
    },
  ],
  responses: {
    '200': {
      description: 'Lista de livros retornada com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: { $ref: '#/components/schemas/BookResponse' },
              },
              totalItems: {
                type: 'integer',
                description: "Total de items",
              }
            },
          },
        },
      },
    },
  },
}
