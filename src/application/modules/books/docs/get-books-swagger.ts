import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const getBooksSwagger: Operation = {
  tags: [Tags.BOOKS],
  summary: 'Lista todos os livros',
  description: 'Retorna uma lista com todos os livros cadastrados',
  parameters: [
    {
      name: "limit",
      in: "query",
      description: "Número de livros por página",
      required: false,
      schema: {
        type: "integer",
        default: 10,
      },
    },
    {
      name: "cursor",
      in: "query",
      description: "Cursor para paginação baseada em cursor, UUID",
      required: false,
      schema: {
        type: "string",
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
              nextCursor: {
                type: 'string',
                nullable: true,
                description: "Cursor para a próxima página. Null indica que não há mais resultados.",
              }
            }
          },
        },
      },
    },
  },
}
