import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const getLoansSwagger: Operation = {
  tags: [Tags.LOANS],
  summary: 'Lista todos os empréstimos (Em desenvolvimento)',
  description: 'Retorna uma lista com todos os empréstimos cadastrados',
  responses: {
    '200': {
      description: 'Lista de empréstimos retornada com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: { $ref: '#/components/schemas/LoanResponse' },
          },
        },
      },
    },
  },
}
