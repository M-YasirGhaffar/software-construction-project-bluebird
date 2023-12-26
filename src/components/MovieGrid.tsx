import type MovieDB from "node-themoviedb";
import MoviePreview, { MoviePreviewSkeleton } from "./MoviePreview";

/**
 * MovieGrid Component
 *
 * This component displays a grid of movie previews with a title.
 *
 * @param {Object} props - The properties of the component.
 * @param {string} props.title - The title of the movie grid.
 * @param {MovieDB.Responses.Movie.GetDetails[]} props.movies - An array of movie details to be displayed in the grid.
 * 
 * @returns {React.Component} - The rendered MovieGrid component.
 */
function MovieGrid({
  movies,
  title,
}: {
  title: string;
  movies: MovieDB.Responses.Movie.GetDetails[];
}) {
  return (
    <div className="mb-8" data-testid="movie-grid">
      <h1 className="mb-4 text-2xl font-medium capitalize">{title}</h1>
      {movies?.length > 0 ? (
        <div className="flex flex-wrap items-center gap-5">
          {movies?.slice(0, 18)?.map((movie) => (
            <MoviePreview key={movie.id} movie={movie}/>
          ))}
        </div>
      ) : (
        <div className="flex h-[300px] items-center justify-center rounded-xl bg-slate-100">
          No movies found
        </div>
      )}
    </div>
  );
}

export default MovieGrid;

/**
 * MovieRowSkeleton Component
 *
 * This component provides a skeleton loading state for the MovieGrid component.
 * It is used to indicate a loading state while fetching movie details.
 *
 * @param {Object} props - The properties of the component.
 * @param {number} props.amount - The number of movie preview skeletons to be displayed.
 * 
 * @returns {React.Component} - The rendered MovieRowSkeleton component.
 */
export function MovieRowSkeleton({ amount }: { amount: number }) {
  const MoviesSkeleton = [];
  for (let i = 0; i < amount; i++) {
    MoviesSkeleton.push(<MoviePreviewSkeleton key={"skeleton" + i} />);
  }
  return (
    <div className="mb-8">
      <h1 className="mb-4 text-2xl font-medium capitalize">Loading...</h1>
      <div className="flex flex-wrap items-center gap-5">{MoviesSkeleton}</div>
    </div>
  );
}
