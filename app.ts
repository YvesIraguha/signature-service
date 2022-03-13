import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import devicesRoutes from './src/deviceRoutes';
import transactionsRoutes from './src/transactionRoutes';

const app: Application = express();

app.use(express.json());
app.use(cors());

const serverUrl = process.env.SERVER_URL || 'http://localhost:3000';
app.get('/', (req: Request, res: Response) => {
  res.status(200).send({ message: 'Welcome to signature service API' });
});
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Signature-service API',
      version: '1.0.0',
      description: `Our signature service can manage multiple signature devices. Such a device is identified by an unique identifier. It has a description which can be used to display used to display in the user interface, and a signature counter that tracks how many signatures have been signed with it. During creation, the signature algorithm of the associated key pair is provided by the creator of the device. Our devices can sign using either RSA or ECC. The associated signature algorithm cannot be changed afterwards!`,
      contact: {
        name: 'Signature service API support',
        // url: "http://www.exmaple.com/support",
        email: 'iragahaivos@gmail.com'
      }
    },

    servers: [
      {
        url: serverUrl,
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

export default app;
