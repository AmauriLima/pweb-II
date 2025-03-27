import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const getMyAccountSwagger: Operation = {
  tags: [Tags.ACCOUNTS],
  summary: 'Retorna a conta do usuário autenticado',
  description: 'Retorna os dados da conta do usuário autenticado',
  responses: {
    '200': {
      description: 'Conta retornada com sucesso',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/AccountResponse' },
        },
      },
    },
  },
}
