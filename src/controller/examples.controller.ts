import { Request, Response } from 'express';
// Import { ObjectEncodingOptions } from 'fs';
import fs from 'fs';
import { Example } from '../model/example';

const dataFilePath = './api/db.json';
export let dataArray: Example[] = [];

try {
  const rawData = fs.readFileSync(dataFilePath, 'utf-8');
  dataArray = JSON.parse(rawData).things || [];
} catch (error) {
  console.error('Error al leer el archivo db.json:', error);
}

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
