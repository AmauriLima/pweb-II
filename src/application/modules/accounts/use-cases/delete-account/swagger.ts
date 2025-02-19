import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const deleteAccountSwagger: Operation = {
  tags: [Tags.ACCOUNTS],
  security: [
    { BearerAuth: [] }
  ],
  parameters: [
    {
      name: 'accountId',
      in: 'path',
      description: 'ID da conta',
      required: true,
      schema: {
        type: 'string',
      },
    }
  ],
  summary: 'Remove uma conta',
  description: 'Remove uma conta',
  responses: {
    '204': {
      description: 'Conta removida com sucesso',
    },
    '400': {
      description: 'Erro de validação',
    },
  },
}
