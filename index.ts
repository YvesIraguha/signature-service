import express from "express";
import db from "./models";

const app = express();
const port = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`App Listening on port ${port}`);
  });
});
