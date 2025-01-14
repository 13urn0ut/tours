const { sql } = require("./../dbConnection");

exports.getAllTours = async () => {
  const tourList = await sql`
    SELECT tours.name, tours.price, categories.category, difficulties.difficulty
    FROM tours
    JOIN difficulties
    ON tours.difficulty_id = difficulties.id
    JOIN categories
    ON tours.category_id = categories.id;
    `;

  return tourList;
};

exports.getTourByCategoryId = async (categoryId) => {
  const tours = await sql`
    SELECT tours.name, tours.price, categories.category, difficulties.difficulty
    FROM tours
    JOIN difficulties
    ON tours.difficulty_id = difficulties.id
    JOIN categories
    ON tours.category_id = categories.id
    WHERE tours.category_id = ${categoryId}
  `;

  return tours;
};

exports.countToursByCategory = async () => {
  const result = await sql`
    SELECT categories.category, COUNT(tours.id) AS total_counts
    FROM categories
    JOIN tours
    ON categories.id = tours.category_id
    GROUP BY categories.category;
  `;

  return result;
};

exports.getToursByCatAndDiff = async (cat, diff) => {
  const tours = sql`
    SELECT tours.name, categories.category, difficulties.difficulty
    FROM tours
    JOIN categories
    ON tours.category_id = categories.id
    JOIN difficulties
    ON tours.difficulty_id = difficulties.id
    WHERE categories.category = ${cat} AND difficulties.difficulty = ${diff}
  `;

  return tours;
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
