import axios from "axios";
import { RequestHandler } from "express";

const tmdbBaseUrl = process.env.TMDB_BASE_URL;
const tmdb_key = process.env.TMDB_KEY;

export const getMovies: RequestHandler = async (req, res, next) => {
  const queryObj = { ...req.query };

  const url = Object.entries(queryObj).reduce(
    (acc, [key, value]) => `${acc}&${key}=${value}`,
    `${tmdbBaseUrl}/discover/movie?api_key=${tmdb_key}`
  );

  const result = await axios.get(url).then((res) => res.data);

  res.status(200).json(result);
};

export const getMovieById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const result = await axios
    .get(`${tmdbBaseUrl}/movie/${id}?api_key=${tmdb_key}`)
    .then((res) => res.data);

  res.status(200).json(result);
};

export const getMovieTrailer: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const result = await axios
    .get(`${tmdbBaseUrl}/movie/${id}/videos?api_key=${tmdb_key}`)
    .then((res) => res.data);

  res.status(200).json(result);
};
