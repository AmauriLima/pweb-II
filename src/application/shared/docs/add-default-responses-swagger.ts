import { Operation } from "swagger-jsdoc";

export function addDefaultResponsesSwagger(operation: Operation): Operation {
  return {
    ...operation,
    responses: {
      '401': { $ref: '#/components/responses/UnauthorizedError' },
      '403': { $ref: '#/components/responses/ForbiddenError' },
      ...operation.responses,
    }
  }
}
