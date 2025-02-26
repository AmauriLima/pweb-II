import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const getMyLoansSwagger: Operation = {
  tags: [Tags.LOANS],
  summary: 'Lista todos os empréstimos associados a minha conta',
  description: 'Retorna uma lista com todos os empréstimos associados a minha conta',
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
