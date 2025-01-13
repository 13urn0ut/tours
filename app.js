const express = require("express");
const tourRouter = require("./routers/tourRouter.js");
const {
  sayHello,
  addRequestedDate,
} = require("./middlewares/appMiddlewares.js");

// create server
const app = express();

app.use(express.json());

app.use(sayHello, addRequestedDate);

app.use("/api/v1/tours", tourRouter);

module.exports = app;
