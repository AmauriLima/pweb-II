import { Tags } from '@/@types/tags';
import { env } from '@/application/config/env';
import { accountPathWithId, accountsPath } from '@/application/modules/accounts/docs/accounts-path';
import { accountHttpSchema } from '@/application/modules/accounts/mappers/account-mapper';
import { createAccountOpenAPISchema } from '@/application/modules/accounts/use-cases/create-account/create-account-dto';
import { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.1.0',
    tags: [
      { name: Tags.ACCOUNTS }, { name: Tags.BOOKS }, { name: Tags.LOANS }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        CreateAccount: createAccountOpenAPISchema,
        AccountResponse: accountHttpSchema,
      }
    },
    info: {
      title: 'Biblioteca',
      version: '1.0.0',
      description: 'Documentação da API utilizando Swagger',
    },
    servers: [
      {
        url: `http://localhost:${env.port}`,
        description: 'Servidor Local',
      },
    ],
    paths: {
      '/accounts': accountsPath,
      '/accounts/{accountId}': accountPathWithId,
    }
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger docs available at http://localhost:${env.port}/api-docs`);
};
