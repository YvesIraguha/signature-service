import { Router, Request, Response } from "express";
import DevicesController from "./controllers/devicesController";
import { asyncHandler } from "./helpers";

const routes: Router = Router();

routes
  .route("/devices")
  .get(asyncHandler(DevicesController.listDevices))
  .post(asyncHandler(DevicesController.createDevice));

routes
  .route("/devices/:deviceId")
  .get(asyncHandler(DevicesController.getDeviceById))
  .delete(asyncHandler(DevicesController.removeDevice))
  .put(asyncHandler(DevicesController.put))
  .patch(asyncHandler(DevicesController.patch));

export default routes;
