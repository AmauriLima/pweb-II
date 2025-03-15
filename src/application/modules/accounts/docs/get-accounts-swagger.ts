import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const getAccountsSwagger: Operation = {
  tags: [Tags.ACCOUNTS],
  summary: 'Lista todas as contas',
  description: 'Retorna uma lista com todas as contas cadastradas com suporte a paginação baseada em cursor.',
  parameters: [
    {
      name: "limit",
      in: "query",
      description: "Número de contas por página",
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
      description: 'Lista de contas retornada com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: { $ref: '#/components/schemas/AccountResponse' },
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
