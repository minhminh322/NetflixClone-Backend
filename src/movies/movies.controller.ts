import express from "express";
import passport from "passport";
import { getMovieById, getMovieTrailer, getMovies } from "./movies.service";

const movieRouter = express.Router();
movieRouter
  .route("/movies")
  .get(passport.authenticate("jwt", { session: false }), getMovies);

movieRouter
  .route("/movies/:id")
  .get(passport.authenticate("jwt", { session: false }), getMovieById);

movieRouter
  .route("/movies/:id/videos")
  .get(passport.authenticate("jwt", { session: false }), getMovieTrailer);
export default movieRouter;
