import { Schema, model } from 'mongoose';
import { Film } from '../../entities/film.js';

const filmsSchema = new Schema<Film>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  producer: {
    type: String,
    required: true,
  },
  era: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
    unique: true,
  },
  director: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

filmsSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const FilmModel = model('Film', filmsSchema, 'films');
