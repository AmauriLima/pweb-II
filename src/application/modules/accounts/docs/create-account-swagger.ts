import { Tags } from "@/@types/tags";
import { ACCESS_FORBIDDEN_ERROR } from "@/application/shared/http/middlewares/authorization-middleware";
import { Operation } from "swagger-jsdoc";
import { VALIDATE_ROLE_HIERARCHY_ERROR } from "../use-cases/validate-role-hierarchy/validate-role-hierarchy-use-case";

export const CREATE_ACCOUNT_CONFLICT_ERROR = 'Já existe uma conta com esse e-mail!';
export const CREATE_ACCOUNT_ERROR = 'Erro ao criar conta!';

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
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
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
    '409': {
      description: 'Já existe uma conta com esse email',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
          examples: {
            'E-mail em uso': {
              value: { messages: [CREATE_ACCOUNT_CONFLICT_ERROR] }
            }
          }
        },
      },
    },
    '500': {
      description: 'Erro interno do servidor',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
          examples: {
            'Erro ao criar': {
              value: { messages: [CREATE_ACCOUNT_ERROR] }
            }
          }
        },
      },
    }
  },
}
