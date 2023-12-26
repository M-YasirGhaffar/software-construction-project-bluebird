import type MovieDB from "node-themoviedb";
import MoviePreview from "./MoviePreview";

/**
 * SimilarMovies Component
 *
 * This component displays a list of similar movies.
 *
 * @param {Object} props - The component props.
 * @param {MovieDB.Responses.Movie.GetDetails[]} props.movies - The list of similar movies.
 * @returns {React.Component} - The rendered SimilarMovies component.
 */
function SimilarMovies({
  movies,
}: {
  movies: MovieDB.Responses.Movie.GetDetails[];
}) {
  if (!movies) {
    return "loading";
  }
  return (
    <div className="mb-8">
      <h1 className="mb-4 text-2xl font-medium capitalize">Similar Movies</h1>
      <div className="flex flex-wrap items-center gap-5">
        {movies?.slice(0, 18)?.map((movie, index) => (
          <MoviePreview key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default SimilarMovies;

/**
 * SimilarMoviesSkeleton Component
 *
 * This component renders a skeleton loading state for SimilarMovies.
 *
 * @returns {React.Component} - The rendered SimilarMoviesSkeleton component.
 */
export function SimilarMoviesSkeleton() {
  return (
    <div className="mb-8">
      <h1 className="mb-4 animate-pulse bg-gray-400 text-2xl font-medium capitalize">
        Loading...
      </h1>
      <div className="flex flex-wrap items-center gap-5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
          <div
            key={index}
            className="h-64 w-32 animate-pulse rounded-lg bg-gray-400"
          />
        ))}
      </div>
    </div>
  );
}
