import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const getMyLoansSwagger: Operation = {
  tags: [Tags.LOANS],
  summary: 'Lista todos os empréstimos associados a minha conta',
  description: 'Retorna uma lista com todos os empréstimos associados a minha conta',
  parameters: [
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
