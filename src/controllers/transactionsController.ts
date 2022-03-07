import { Request, Response } from "express";
import debug from "debug";
import TransactionService from "../services/transactionService";

const log: debug.IDebugger = debug("app:transaction-controller");

class TransactionsController {
  async signTransaction(req: Request, res: Response) {
    const signedTransaction = await TransactionService.createSignature(
      req.body
    );
    log("transaction signed");
    res.status(200).send({ data: signedTransaction });
  }
}

export default new TransactionsController();
