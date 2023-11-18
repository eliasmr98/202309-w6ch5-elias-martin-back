import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { examplesRouter } from './router/examples.router.js';

export const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static('public'));

app.use('/examples', examplesRouter);
