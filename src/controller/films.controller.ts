import { Request, Response } from 'express';
import fs from 'fs/promises';
import { Film } from '../model/film.js';
import { ObjectEncodingOptions } from 'fs';

const fileName = './api/db.json';
const codeOptions: ObjectEncodingOptions = {
  encoding: 'utf-8',
};
export let dataArray: Film[] = [];
export const readDataFile = async () => {
  try {
    const rawData = (await fs.readFile(fileName, codeOptions)) as string;
    dataArray = JSON.parse(rawData).films || [];
  } catch (error) {
    console.log((error as Error).message);
  }
};

readDataFile();

export const getAll = (_req: Request, res: Response) => {
  res.json(dataArray);
};

export const getById = (req: Request, res: Response) => {
  const result = dataArray.find((item) => item.id === Number(req.params.id));
  res.json(result);
};

export const create = (req: Request, res: Response) => {
  const result = { ...req.body, id: dataArray.length + 1 };
  dataArray.push(result);
  res.json(result);
};

export const update = (req: Request, res: Response) => {
  let result = dataArray.find(
    (item) => Number(item.id) === Number(req.params.id)
  );
  result = { ...result, ...req.body };
  dataArray[dataArray.findIndex((item) => item.id === Number(req.params.id))] =
    result!;
  res.json(result);
};

export const remove = (req: Request, res: Response) => {
  dataArray.splice(
    dataArray.findIndex((item) => item.id === Number(req.params.id)),
    1
  );
  res.json({});
};
