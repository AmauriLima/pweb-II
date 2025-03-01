import { Tags } from "@/@types/tags";
import { ACCESS_FORBIDDEN_ERROR } from "@/application/shared/http/middlewares/authorization-middleware";
import { Operation } from "swagger-jsdoc";
import { VALIDATE_ROLE_HIERARCHY_ERROR } from "../use-cases/validate-role-hierarchy/validate-role-hierarchy-use-case";
import { CREATE_ACCOUNT_CONFLICT_ERROR } from "./create-account-swagger";

export const UPDATE_ACCOUNT_CONFLICT_ERROR = CREATE_ACCOUNT_CONFLICT_ERROR;
export const ACCOUNT_NOT_FOUND_ERROR = 'Usuário não encontrado!';

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
  summary: 'Atualiza uma conta',
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
    '403': {
      description: 'Acesso negado',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/MultipleErrorsResponse' },
          examples: {
            'Acesso negado': {
              value: { messages: [ACCESS_FORBIDDEN_ERROR] }
            },
            'Erro de hierarquia': {
              value: { messages: [VALIDATE_ROLE_HIERARCHY_ERROR] }
            }
          }
        }
      }
    },
    '404': {
      description: 'Conta não encontrada',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
          example: { messages: [ACCOUNT_NOT_FOUND_ERROR] }
        },
      },
    },
    '409': {
      description: 'Já existe uma conta com esse email',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
          example: { messages: [UPDATE_ACCOUNT_CONFLICT_ERROR] }
        },
      },
    },
  },
}
