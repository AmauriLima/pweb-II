import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";


export const getAccountsSwagger: Operation = {
  tags: [Tags.ACCOUNTS],
  summary: 'Lista todas as contas',
  description: 'Retorna uma lista com todas as contas cadastradas',
  responses: {
    '200': {
      description: 'Lista de contas retornada com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: { $ref: '#/components/schemas/AccountResponse' },
          },
        },
      },
    },
  },
}
