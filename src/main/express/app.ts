import { makeHandleApplicationErrorMiddleware } from '@/application/shared/http/middlewares/factories/make-handle-application-error-middleware';
import { errorMiddlewareAdapter } from './adapters/error-middleware-adapter';

import { setupSwagger } from '@@/swagger.config';
import cors from 'cors';
import express from 'express';
import { appRouter } from './routes/app-router';

const app = express();

app.use(cors());
app.use(express.json());

app.use(appRouter);

app.use(errorMiddlewareAdapter(makeHandleApplicationErrorMiddleware()));

setupSwagger(app);

export { app };

