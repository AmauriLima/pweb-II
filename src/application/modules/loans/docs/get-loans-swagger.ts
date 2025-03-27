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
      name: "page",
      in: "query",
      description: "Página atual para paginação",
      required: false,
      schema: {
        type: "integer",
        default: 1,
      },
    },
    {
      name: "perPage",
      in: "query",
      description: "Quantidade de itens por página",
      required: false,
      schema: {
        type: "integer",
        default: 10,
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
