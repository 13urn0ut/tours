const { sql } = require("./../dbConnection");

exports.getAllTours = async () => {
  const tourList = await sql`
    SELECT tours.*
    FROM tours;
    `;

  return tourList;
};

exports.getTourById = async (id) => {
  const [tour] = await sql`
    SELECT tours.*
    FROM tours
    WHERE tours.id = ${id};
    `;

  return tour;
};

exports.postTour = async (tour) => {
  const columns = Object.keys(tour);
  const [newTour] = await sql`
    INSERT INTO tours ${sql(tour, columns)}
    RETURNING tours.*;
    `;

  return newTour;
};

exports.updateTour = async (id, tour) => {
  const columns = Object.keys(tour);
  const [updatedTour] = await sql`
    UPDATE tours
    SET ${sql(tour, columns)}
    WHERE tours.id = ${id}
    RETURNING tours.*;
    `;

  return updatedTour;
};

exports.deleteTour = async (id) => {
  const [deletedTour] = await sql`
    DELETE FROM tours
    WHERE tours.id = ${id}
    RETURNING tours.*;
    `;

  return deletedTour;
};
