import express from "express";
import Gym from "../models/gym.js";

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const query = constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOption) {
      case "A-Z":
        sortOptions = { name: 1 };
        break;
      case "Z-A":
        sortOptions = { name: -1 };
        break;
      case "pricePerHourAsc":
        sortOptions = { pricePerHour: 1 };
        break;
      case "pricePerHourDesc":
        sortOptions = { pricePerHour: -1 };
        break;
    }

    const pageSize = 16;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;

    const gyms = await Gym.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);
    const total = await Gym.countDocuments(query);

    const response = {
      data: gyms,
      pagination: {
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
        total,
      },
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong");
  }
});

const constructSearchQuery = (queryParams) => {
  let constructedQuery = {};

  if (queryParams.searchTerm) {
    const modSearchTerm =
      queryParams.searchTerm[0].toUpperCase() +
      queryParams.searchTerm.slice(1).toLowerCase();

    constructedQuery.$or = [
      { city: new RegExp(modSearchTerm, "i") },
      { name: new RegExp(modSearchTerm, "i") },
      { address: new RegExp(modSearchTerm, "i") },
      { zipCode: new RegExp(modSearchTerm, "i") },
    ];
  }

  if (queryParams.sports) {
    constructedQuery.sports = {
      $all: Array.isArray(queryParams.sports)
        ? queryParams.sports
        : [queryParams.sports],
    };
  }

  if (queryParams.filters) {
    constructedQuery.filters = {
      $all: Array.isArray(queryParams.filters)
        ? queryParams.filters
        : [queryParams.filters],
    };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerHour = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }

  return constructedQuery;
};

export default router;
