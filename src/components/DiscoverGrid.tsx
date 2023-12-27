import type MovieDB from "node-themoviedb";
import MovieGrid from "./MovieGrid";

// Defining possible types for movie lists
type LIST_TYPES = "POPULAR" | "TOPRATED" | "NOWPLAYING" | "UPCOMING";

// Mapping list types to their corresponding names
const LIST_NAMES = {
  POPULAR: "Popular",
  TOPRATED: "Top Rated",
  NOWPLAYING: "Now Playing",
  UPCOMING: "Upcoming",
};


/**
 * DiscoverGrid Component: Renders a MovieGrid component based on the provided list type.
 *
 * @param {Object} props - Component props.
 * @param {LIST_TYPES} props.type - Type of the movie list (POPULAR, TOPRATED, NOWPLAYING, UPCOMING).
 * @param {MovieDB.Responses.Movie.GetDetails[]} props.movies - Array of movie details.
 * @returns {JSX.Element} - Rendered DiscoverGrid component.
 */
function DiscoverGrid({
  type,
  movies,
}: {
  type: LIST_TYPES;
  movies: MovieDB.Responses.Movie.GetDetails[];
}) {
  return <MovieGrid movies={movies} title={LIST_NAMES[type]} />;
}

// Exporting DiscoverGrid component as default
export default DiscoverGrid;
