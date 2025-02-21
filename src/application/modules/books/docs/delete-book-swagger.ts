import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const deleteBookSwagger: Operation = {
  tags: [Tags.BOOKS],
  security: [
    { BearerAuth: [] }
  ],
  parameters: [
    {
      name: 'bookId',
      in: 'path',
      description: 'ID do livro',
      required: true,
      schema: {
        type: 'string',
      },
    }
  ],
  summary: 'Remove um livro',
  description: 'Está operação ainda não foi implementada',
  responses: {
    '204': {
      description: 'Livro removido com sucesso',
    },
    '400': {
      description: 'Erro de validação',
    },
    '404': {
      description: 'Livro não encontrado',
    },
  },
}
