import { Schema, model } from 'mongoose';
import { Film } from '../entities/film';

const filmsSchema = new Schema<Film>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  producer: {
    type: String,
  },
  era: {
    type: String,
  },
  year: {
    type: String,
  },
  img: {
    type: String,
    unique: true,
  },
  director: {
    type: String,
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
