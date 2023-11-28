import { Schema, model } from 'mongoose';
import { Film } from '../../entities/film.js';

const filmsSchema = new Schema<Film>({
  name: {
    type: String,
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
  filmFrontImg: {
    publicId: String,
    size: Number,
    height: Number,
    width: Number,
    format: String,
    url: String,
  },
  filmBackImg: {
    publicId: String,
    size: Number,
    height: Number,
    width: Number,
    format: String,
    url: String,
  },
  director: {
    type: String,
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

export const FilmModel = model<Film>('Film', filmsSchema, 'films');
