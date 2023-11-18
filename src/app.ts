import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { filmsRouter } from './router/films.routes.js';

export const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static('public'));

app.use('/films', filmsRouter);
