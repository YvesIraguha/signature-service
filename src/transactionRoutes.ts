import { Router, Request, Response } from "express";
import TransactionsController from "./controllers/transactionsController";
import { asyncHandler } from "./helpers";

const routes: Router = Router();

routes
  .route("/sign-tx")
  .post(asyncHandler(TransactionsController.signTransaction));

export default routes;
