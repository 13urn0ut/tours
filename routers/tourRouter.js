const express = require("express");
const {
  getAllTours,
  getTourById,
  postTour,
  updateTour,
  deleteTour,
} = require("../controllers/toursController");

const tourRouter = express.Router();

tourRouter.route("/").get(getAllTours).post(postTour);
tourRouter.route("/:id").get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = tourRouter;
