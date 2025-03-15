import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const getLoansSwagger: Operation = {
  tags: [Tags.LOANS],
  summary: 'Lista todos os empréstimos',
  description: 'Retorna uma lista com todos os empréstimos cadastrados',
  parameters: [
    {
      name: "accountId",
      in: "query",
      description: "UUID da conta que os empréstimos estão vinculados",
      required: false,
      schema: {
        type: "string",
      },
    },
    {
      name: "limit",
      in: "query",
      description: "Número de empréstimos por página",
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
      description: 'Lista de empréstimos retornada com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: { $ref: '#/components/schemas/LoanResponse' },
              },
              nextCursor: {
                type: 'string',
                nullable: true,
                description: "Cursor para a próxima página. Null indica que não há mais resultados.",
              },
            },
          },
        },
      },
    },
  },
}
