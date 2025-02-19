import { Tags } from '@/@types/tags';
import { env } from '@/application/config/env';
import { accountPathWithId, accountsPath } from '@/application/modules/accounts/docs/accounts-path';
import { accountHttpSchema } from '@/application/modules/accounts/mappers/account-mapper';
import { createAccountOpenAPISchema } from '@/application/modules/accounts/use-cases/create-account/create-account-dto';
import { updateAccountOpenAPISchema } from '@/application/modules/accounts/use-cases/update-account/update-account-dto';
import { booksPath, booksPathWithId } from '@/application/modules/books/docs/books-path';
import { createBookOpenAPISchema } from '@/application/modules/books/use-cases/create-book/create-book-dto';
import { bookHttpSchema } from '@/application/modules/books/use-cases/mappers/book-mapper';
import { updateBookOpenAPISchema } from '@/application/modules/books/use-cases/update-book/update-book-dto';
import { loansPath, loansPathWithId } from '@/application/modules/loans/docs/loans-path';
import { createLoanOpenAPISchema } from '@/application/modules/loans/use-cases/create-loan/create-loan-dto';
import { loanHttpSchema } from '@/application/modules/loans/use-cases/mappers/loan-mapper';
import { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.1.0',
    tags: [
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
      schemas: {
        CreateAccount: createAccountOpenAPISchema,
        UpdateAccount: updateAccountOpenAPISchema,
        AccountResponse: accountHttpSchema,
        CreateBook: createBookOpenAPISchema,
        UpdateBook: updateBookOpenAPISchema,
        BookResponse: bookHttpSchema,
        CreateLoan: createLoanOpenAPISchema,
        LoanResponse: loanHttpSchema,
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
