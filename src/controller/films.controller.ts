import { Request, Response } from 'express';
import fs from 'fs/promises';
import { Film } from '../model/film.js';
import { ObjectEncodingOptions } from 'fs';

const fileName = './api/db.json';
const codeOptions: ObjectEncodingOptions = {
  encoding: 'utf-8',
};

export const readDataFile = async () => {
  try {
    const rawData = (await fs.readFile(fileName, codeOptions)) as string;
    return JSON.parse(rawData).films as Film[];
  } catch (error) {
    console.log((error as Error).message);
  }
};

const writeDataFile = async (films: Film[]) => {
  try {
    const data = { films }; // Crear un objeto con la propiedad "films"
    await fs.writeFile(fileName, JSON.stringify(data), 'utf8');
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const getAll = async (_req: Request, res: Response) => {
  const jsonData = await readDataFile();
  res.json(jsonData);
};

export const getById = async (req: Request, res: Response) => {
  const jsonData = (await readDataFile()) as Film[];
  const result = jsonData.find(
    (item: { id: number }) => item.id === Number(req.params.id)
  );
  res.json(result);
};

export const create = async (req: Request, res: Response) => {
  const jsonData = (await readDataFile()) as Film[];
  const maxId = Math.max(...jsonData.map((film) => film.id), 0);
  const newFilm = { ...req.body, id: maxId + 1 };
  jsonData.push(newFilm);
  await writeDataFile(jsonData);
  res.json(newFilm);
};

export const update = async (req: Request, res: Response) => {
  try {
    const jsonData = (await readDataFile()) as Film[];
    const index = jsonData.findIndex(
      (item: { id: number }) => item.id === Number(req.params.id)
    );
    // eslint-disable-next-line no-negated-condition
    if (index !== -1) {
      const updatedFilm = { ...jsonData[index], ...req.body };
      jsonData[index] = updatedFilm;
      await writeDataFile(jsonData);
      res.json(updatedFilm);
    } else {
      res.status(404).json({ error: 'Film not found' });
    }
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const jsonData = (await readDataFile()) as Film[];
    const index = jsonData.findIndex(
      (item: { id: number }) => item.id === Number(req.params.id)
    );
    // eslint-disable-next-line no-negated-condition
    if (index !== -1) {
      jsonData.splice(index, 1);
      await writeDataFile(jsonData);
      res.json({});
    } else {
      res.status(404).json({ error: 'Film not found' });
    }
  } catch (error) {
    console.log((error as Error).message);
  }
};
