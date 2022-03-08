import { Router, Request, Response } from "express";
import TransactionsController from "./controllers/transactionsController";
import { asyncHandler } from "./helpers";
import { validateTransactionSchema } from "./middleware/validator";
const routes: Router = Router();

routes
  .route("/sign-tx")
  .post(
    validateTransactionSchema,
    asyncHandler(TransactionsController.signTransaction)
  );

export default routes;
