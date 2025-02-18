const {
  getAllTours,
  getTourById,
  postTour,
  deleteTour,
  updateTour,
  getTourByCategoryId,
  countToursByCategory,
  getToursByCatAndDiff,
  filterTours,
} = require("../models/tourModel");

exports.getAllTours = async (req, res) => {
  try {
    const tours = await getAllTours();

    res.status(200).json({
      status: "success", // success, fail, error
      results: tours.length,
      data: tours,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getTourById = async (req, res) => {
  const { id } = req.params;

  try {
    const tour = await getTourById(id);

    if (!tour)
      return res.status(404).json({
        status: "fail",
        message: "invalid ID",
      });

    res.status(200).json({
      status: "success",
      data: tour,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getTourByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId || isNaN(categoryId))
      return res.status(400).json({
        status: "fail",
        message: "Invalid or missing ID",
      });

    const tours = await getTourByCategoryId(categoryId);

    if (!tours || tours?.length < 1)
      return res.status(404).json({
        status: "fail",
        message: "No tours found",
      });

    res.status(200).json({
      status: "success",
      results: tours.length,
      data: tours,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.countToursByCategory = async (req, res) => {
  try {
    const data = await countToursByCategory();

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getToursByCatAndDiff = async (req, res) => {
  try {
    const { category, difficulty } = req.params;

    const tours = await getToursByCatAndDiff(category, difficulty);

    if (!tours || tours?.length < 1)
      return res.status(404).json({
        status: "fail",
        message: "No tours found",
      });

    res.status(200).json({
      status: "success",
      data: tours,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getFilteredTours = async (req, res) => {
  try {
    const filter = req.query;
    const tours = await filterTours(filter);

    console.log(tours);

    res.status(200).json({
      status: "success",
      results: tours.length,
      data: tours,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.postTour = async (req, res) => {
  const newTour = req.body;

  if (!newTour)
    return res.status(400).json({
      status: "fail",
      message: "Bad Request",
    });

  try {
    const tour = await postTour(newTour);

    res.status(201).json({
      status: "success",
      data: tour,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateTour = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    const tour = await getTourById(id);

    if (!tour)
      return res.status(404).json({
        status: "fail",
        message: "invalid ID",
      });

    const updatedTour = await updateTour(id, { ...newData });

    res.status(200).json({
      status: "succes",
      data: updatedTour,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteTour = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTour = await deleteTour(id);

    console.log(deletedTour);

    if (!deletedTour)
      return res.status(404).json({
        status: "fail",
        message: "invalid ID",
      });

    res.status(204).json({
      status: "succes",
      data: deletedTour,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
