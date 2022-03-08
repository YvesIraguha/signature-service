import { Router } from "express";
import DevicesController from "./controllers/devicesController";
import { asyncHandler } from "./helpers";
import { validateDeviceSchema } from "./middleware/validator";

const routes: Router = Router();

routes
  .route("/devices")
  .get(asyncHandler(DevicesController.listDevices))
  .post(validateDeviceSchema, asyncHandler(DevicesController.createDevice));

routes
  .route("/devices/:deviceId")
  .get(asyncHandler(DevicesController.getDeviceById))
  .delete(asyncHandler(DevicesController.removeDevice))
  .put(asyncHandler(DevicesController.put))
  .patch(asyncHandler(DevicesController.patch));
routes
  .route("/devices/:deviceId/transactions")
  .get(asyncHandler(DevicesController.getDevicesTransactions));

export default routes;
