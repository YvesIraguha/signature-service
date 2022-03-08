import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import devicesRoutes from './src/deviceRoutes';
import transactionsRoutes from './src/transactionRoutes';

export const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const runningMessage = `App Listening on port ${port}`;

app.get('/', (req: Request, res: Response) => {
  res.status(200).send(runningMessage);
});
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Signature-device API',
      version: '1.0.0',
      description:
        'A signature service for managing devices to sign transactions   ',
      contact: {
        name: 'Signature Device API support',
        // url: "http://www.exmaple.com/support",
        email: 'iragahaivos@gmail.com'
      }
    },

    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Signature device server'
      }
    ]
  },
  apis: ['./src/deviceRoutes.ts', './src/transactionRoutes.ts']
};

const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use(devicesRoutes);
app.use(transactionsRoutes);

app.listen(port, () => {
  console.log(runningMessage);
});
