import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { examplesRouter } from './router/examples.router.js';

export const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static('public'));

app.use((_req: Request, res: Response, next: NextFunction) => {
  console.log('Hola soy el nuevo challenge');
  next();
});

app.get('/', (_req: Request, res: Response) => {
  res.json('Respuesta al Get');
});
app.post('/', (_req: Request, res: Response) => {
  res.send('Respuesta al Post');
});
app.patch('/', (_req: Request, res: Response) => {
  res.send('Respuesta al Patch');
});
app.delete('/', (_req: Request, res: Response) => {
  res.send('Respuesta al Delete');
});

app.use('/examples', examplesRouter);
