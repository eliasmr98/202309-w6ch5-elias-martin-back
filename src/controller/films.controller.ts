import { Request, Response } from 'express';
import { dataArray } from '../files.js';

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
