import express, { Express, Request, Response } from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import csv from 'csv-parser';

const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app: Express = express();
const port = 8000;

app.use(cors());

let lastPosition: number = 0;
let lastCalculation: number = 0;
let calculations: Calculation[] = [];

app.get('/numOfCalculations', (req: Request, res: Response) => {
  let actualCalculations: Calculation[] = [];
  fs.createReadStream(path.join(__dirname, "calculations.csv"))
      .pipe(csv({ separator: ';' }))
      .on('data', (row) => {
        actualCalculations.push(row);
      })
      .on('end', () => {
        res.status(200).json(actualCalculations.length);
      });
});

app.get('/history', (req: Request, res: Response) => {
  let actualCalculations: Calculation[] = [];
  fs.createReadStream(path.join(__dirname, "calculations.csv"))
      .pipe(csv({ separator: ';' }))
      .on('data', (row) => {
        actualCalculations.push(row);
      })
      .on('end', () => {
        res.status(200).json(actualCalculations);
      });
});

app.get('/lastResult', (req: Request, res: Response) => {
  res.status(200).json(lastCalculation);
});

app.get('/lastPosition', (req: Request, res: Response) => {
  res.status(200).json(lastPosition);
});

app.get('/fibonacci/:position', (req: Request, res: Response) => {
  const input = req.params.position;

  let message: string;
  let position: number = 0;

  if (input !== undefined && !isNaN(+input) && Number.isInteger(+input)) {
    position = +input;
    lastPosition = position;
  }

  res.status(200).json(fibonacciCalculation(position));
});

const fibonacciCalculation = (number: number): number => {
  if (number < 1) {
    return 0;
  }

  let a = 0;
  let b = 1;

  for (let i = 1; i < number; ++i) {
    const c = a + b;
    a = b;
    b = c;
  }

  const row = `${formatDateTime()};${number};${b}\n`;
  fs.appendFileSync(path.join(__dirname, "calculations.csv"), row);

  lastCalculation = b;
  return b;
};

const formatDateTime = (): string => {
  const timestamp = Math.floor(Date.now());
  const date = new Date(timestamp);

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();

  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();

  return day + ' ' + month + ' ' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

http.createServer(app).listen(port, () => {
  fs.createReadStream(path.join(__dirname, "calculations.csv"))
      .pipe(csv({ separator: ';' }))
      .on('data', (row) => {
        lastPosition = row.position;
        lastCalculation = row.result;
      });
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});