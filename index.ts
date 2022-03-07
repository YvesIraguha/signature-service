import express, { Application, Request, Response } from "express";
import cors from "cors";
import devicesRoutes from "./src/deviceRoutes";
import transactionsRoutes from "./src/transactionRoutes";

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const runningMessage = `App Listening on port ${port}`;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send(runningMessage);
});

app.use(devicesRoutes);
app.use(transactionsRoutes);

app.listen(port, () => {
  console.log(runningMessage);
});
