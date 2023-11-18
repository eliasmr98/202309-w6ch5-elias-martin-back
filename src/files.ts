import fs from 'fs/promises';
import { Example } from './model/example.js';
import { ObjectEncodingOptions } from 'fs';

const fileName = './api/db.json';
const codeOptions: ObjectEncodingOptions = {
  encoding: 'utf-8',
};
export let dataArray: Example[] = [];
export const readDataFile = async () => {
  try {
    const rawData = (await fs.readFile(fileName, codeOptions)) as string;
    dataArray = JSON.parse(rawData).things || [];
  } catch (error) {
    console.log((error as Error).message);
  }
};

readDataFile();
