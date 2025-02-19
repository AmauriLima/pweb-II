import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const createAccountSwagger: Operation = {
  tags: [Tags.ACCOUNTS],
  summary: 'Cria uma nova conta',
  description: 'Cria uma conta nova e retorna os dados da conta cadastrada',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/CreateAccount' },
      },
    },
  },
  responses: {
    '201': {
      description: 'Conta criada com sucesso',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/AccountResponse' },
        },
      },
    },
    '400': {
      description: 'Erro de validação',
    },
    '409': {
      description: 'Já existe uma conta com esse email',
    }
  },
}
