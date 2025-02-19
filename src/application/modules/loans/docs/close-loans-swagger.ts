import { Tags } from "@/@types/tags";
import { Operation } from "swagger-jsdoc";

export const closeLoanSwagger: Operation = {
  tags: [Tags.LOANS],
  summary: 'Fecha um empréstimos (Em desenvolvimento)',
  description: 'Fecha um empréstimo salvando a data atual como data de devolução',
  responses: {
    '201': {
      description: 'Empréstimo finalizado com sucesso',
    },
    '404': {
      description: 'Empréstimo não encontrado'
    },
    '409': {
      description: 'Esse empréstimo já foi fechado'
    }
  },
}
