import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const getAccountsSwagger: Operation = {
  tags: [Tags.ACCOUNTS],
  summary: 'Lista todas as contas',
  description: 'Retorna uma lista com todas as contas cadastradas com suporte a paginação baseada em cursor.',
  parameters: [
    {
      name: "page",
      in: "query",
      description: "Página atual",
      required: false,
      schema: {
        type: "integer",
        default: 1,
      },
    },
    {
      name: "perPage",
      in: "query",
      description: "Número de items por página",
      required: false,
      schema: {
        type: "integer",
        default: 10
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
              totalItems: {
                type: 'integer',
                description: "Total de items",
              }
            }
          },
        },
      },
    },
  },
}
