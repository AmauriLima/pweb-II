import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const updateAccountSwagger: Operation = {
  tags: [Tags.ACCOUNTS],
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
  summary: 'Atualiza uma conta (Em desenvolvimento)',
  description: 'Atualiza uma conta e retorna os dados da conta atualizada',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/UpdateAccount' },
      },
    },
  },
  responses: {
    '201': {
      description: 'Conta atualizada com sucesso',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/AccountResponse' },
        },
      },
    },
    '400': {
      description: 'Erro de validação',
    },
    '404': {
      description: 'Conta não encontrada',
    },
    '409': {
      description: 'Já existe uma conta com esse email',
    }
  },
}
