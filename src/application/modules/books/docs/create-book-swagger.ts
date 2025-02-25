import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const CREATE_BOOK_ERROR = 'Erro ao criar livro';

export const createBookSwagger: Operation = {
  tags: [Tags.BOOKS],
  summary: 'Cria um novo livro',
  description: 'Cria um livro novo e retorna os dados do livro cadastrada',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/CreateBook' },
      },
    },
  },
  responses: {
    '201': {
      description: 'Livro criado com sucesso',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/BookResponse' },
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
    '500': {
      description: 'Erro interno do servidor',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
          examples: {
            'Erro ao criar': {
              value: { messages: [CREATE_BOOK_ERROR] }
            }
          }
        },
      },
    }
  },
}
