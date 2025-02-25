import { Tags } from '@/@types/tags';
import { env } from '@/application/config/env';
import { accountPathWithId, accountsPath } from '@/application/modules/accounts/docs/accounts-path';
import { accountHttpSchema } from '@/application/modules/accounts/mappers/account-mapper';
import { createAccountOpenAPISchema } from '@/application/modules/accounts/use-cases/create-account/create-account-dto';
import { updateAccountOpenAPISchema } from '@/application/modules/accounts/use-cases/update-account/update-account-dto';
import { authPath } from '@/application/modules/auth/docs/auth-path';
import { signInHttpSchema } from '@/application/modules/auth/docs/sign-in-swagger';
import { signInOpenAPISchema } from '@/application/modules/auth/use-cases/sign-in/sign-in-dto';
import { booksPath, booksPathWithId } from '@/application/modules/books/docs/books-path';
import { bookHttpSchema } from '@/application/modules/books/mappers/book-mapper';
import { createBookOpenAPISchema } from '@/application/modules/books/use-cases/create-book/create-book-dto';
import { updateBookOpenAPISchema } from '@/application/modules/books/use-cases/update-book/update-book-dto';
import { loansPath, loansPathWithId } from '@/application/modules/loans/docs/loans-path';

import { loanHttpSchema } from '@/application/modules/loans/mappers/loan-mapper';
import { createLoanOpenAPISchema } from '@/application/modules/loans/use-cases/create-loan/create-loan-dto';
import { INVALID_TOKEN_ERROR } from '@/application/shared/http/middlewares/authentication-middleware';
import { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.1.0',
    tags: [
      {
        name: Tags.AUTH,
        description: 'Endpoints relacionados a autenticação',
      },
      {
        name: Tags.ACCOUNTS,
        description: 'Endpoints relacionados a contas de usuários',
      },
       {
        name: Tags.BOOKS,
        description: 'Endpoints relacionados a livros',
      },
      {
        name: Tags.LOANS,
        description: 'Endpoints relacionados a empréstimos',
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: "Token inválido ou não fornecido",
          content: {
            "application/json": {
              example: {
                message: [INVALID_TOKEN_ERROR],
              },
            },
          },
        },
      },
      schemas: {
        SignIn: signInOpenAPISchema,
        SignInResponse: signInHttpSchema,
        CreateAccount: createAccountOpenAPISchema,
        UpdateAccount: updateAccountOpenAPISchema,
        AccountResponse: accountHttpSchema,
        CreateBook: createBookOpenAPISchema,
        UpdateBook: updateBookOpenAPISchema,
        BookResponse: bookHttpSchema,
        CreateLoan: createLoanOpenAPISchema,
        LoanResponse: loanHttpSchema,
        ErrorsResponse: {
          type: 'object',
          properties: {
            messages: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Mensagens de erro'
            }
          }
        },
        MultipleErrorsResponse: {
          oneOf: [
            { $ref: '#/components/schemas/ErrorsResponse' }
          ],
          description: 'Possíveis mensagens de erro'
        },
      }
    },
    info: {
      title: 'Biblioteca',
      version: '1.0.0',
      description: 'Documentação da API utilizando Swagger',
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
    servers: [
      {
        url: `http://localhost:${env.port}`,
        description: 'Servidor Local',
      },
    ],
    paths: {
      '/auth/sign-in': authPath,
      '/accounts': accountsPath,
      '/accounts/{accountId}': accountPathWithId,
      '/books': booksPath,
      '/books/{bookId}': booksPathWithId,
      '/loans': loansPath,
      '/loans/{loanId}': loansPathWithId,
    }
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger docs available at http://localhost:${env.port}/api-docs`);
};
