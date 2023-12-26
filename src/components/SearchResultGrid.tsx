import type MovieDB from "node-themoviedb";
import MovieGrid from "./MovieGrid";

/**
 * SearchResultGrid Component
 *
 * This component displays a grid of movie search results.
 *
 * @param {Object} props - The component props.
 * @param {MovieDB.Responses.Movie.GetDetails[]} props.movies - The list of movie search results.
 * @param {string} props.query - The search query used to fetch the results.
 * @returns {React.Component} - The rendered SearchResultGrid component.
 */
export default function SearchResultGrid({
  movies,
  query,
}: {
  movies: MovieDB.Responses.Movie.GetDetails[];
  query: string;
}) {
  return (
    <MovieGrid
      movies={movies}
      title={`Search Result for "${query}" : ${movies.length} results found`}
    />
  );
}
