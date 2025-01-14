const express = require("express");
const {
  getAllTours,
  getTourById,
  postTour,
  updateTour,
  deleteTour,
  getTourByCategoryId,
  countToursByCategory,
  getToursByCatAndDiff,
} = require("../controllers/toursController");

const tourRouter = express.Router();

tourRouter.route("/").get(getAllTours).post(postTour);
tourRouter.route("/category").get(countToursByCategory);
tourRouter.route("/:id").get(getTourById).patch(updateTour).delete(deleteTour);
tourRouter.route("/category/:categoryId").get(getTourByCategoryId);
tourRouter
  .route("/category/:category/difficulty/:difficulty")
  .get(getToursByCatAndDiff);

module.exports = tourRouter;
