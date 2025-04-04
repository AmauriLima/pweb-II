import { IController } from '@/application/shared/http/interfaces/controller';
import { NextFunction, Request, Response } from 'express';

export function routeAdapter(controller: IController) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { statusCode, body } = await controller.handle({
        body: request.body,
        params: request.params,
        query: request.query,
        account: request.metadata?.account,
        headers: request.headers as Record<string, string>,
      });

      response.status(statusCode).json(body);
    } catch (error) {
      next(error);
    }
  };
}
