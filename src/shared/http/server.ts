import 'reflect-metadata';
import express, {Response, Request, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from './../errors/AppError';
import './../typeorm';
import uploadConfig from '@config/upload';

const app = express();

app.use(cors());
app.use(express.json());
app.use('./files', express.static(uploadConfig.directory));
app.use(routes);

app.use(errors());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {

      if(error instanceof AppError) {
        return res.status(error.statusCode).json({
          status: 'Error',
          message: error.message
        }); 
      } 
      return res.status(500).json({
        status: 'Error',
        message: 'Internal server error'
      })
    }, 
    );

app.listen(3000, () => console.log('Server  is running'));
