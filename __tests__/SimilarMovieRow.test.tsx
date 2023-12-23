import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SimilarMovies, { SimilarMoviesSkeleton } from "../src/components/SimilarMovieRow";
import MovieDB from "node-themoviedb";

const fakeMovies: MovieDB.Responses.Movie.GetDetails[] = [
  {
    id: 1,
    adult: false,
    backdrop_path: "/defaultBackdrop1.jpg",
    belongs_to_collection: null,
    budget: 0,
    genres: [
      { id: 1, name: "Action" },
      { id: 2, name: "Drama" },
    ],
    homepage: "http://movie1.com",
    imdb_id: "tt123456",
    original_language: "en",
    original_title: "Movie 1",
    overview: "Overview of Movie 1",
    popularity: 123.45,
    poster_path: "/poster1.jpg",
    production_companies: [
      { name: "Company A", id: 101, logo_path: "/companyA_logo.jpg", origin_country: "US" },
      { name: "Company B", id: 102, logo_path: "/companyB_logo.jpg", origin_country: "UK" },
    ],
    production_countries: [
      { iso_3166_1: "US", name: "United States" },
      { iso_3166_1: "UK", name: "United Kingdom" },
    ],
    release_date: "2023-01-01",
    revenue: "50000000",
    runtime: 120,
    spoken_language: [
      { iso_639_1: "en", name: "English" },
      { iso_639_1: "es", name: "Spanish" },
    ],
    status: "Released",
    tagline: "Tagline for Movie 1",
    title: "Movie 1",
    video: false,
    vote_average: 8.0,
    vote_count: 1000,
  },
  {
    id: 2,
    adult: false,
    backdrop_path: "/defaultBackdrop2.jpg",
    belongs_to_collection: {
      id: 201,
      name: "Collection X",
      poster_path: "/collectionX_poster.jpg",
      backdrop_path: "/collectionX_backdrop.jpg",
    },
    budget: 0,
    genres: [
      { id: 3, name: "Comedy" },
      { id: 4, name: "Adventure" },
    ],
    homepage: "http://movie2.com",
    imdb_id: "tt987654",
    original_language: "en",
    original_title: "Movie 2",
    overview: "Overview of Movie 2",
    popularity: 98.76,
    poster_path: "/poster2.jpg",
    production_companies: [
      { name: "Company C", id: 103, logo_path: "/companyC_logo.jpg", origin_country: "CA" },
      { name: "Company D", id: 104, logo_path: "/companyD_logo.jpg", origin_country: "AU" },
    ],
    production_countries: [
      { iso_3166_1: "CA", name: "Canada" },
      { iso_3166_1: "AU", name: "Australia" },
    ],
    release_date: "2023-02-15",
    revenue: "75000000",
    runtime: 135,
    spoken_language: [
      { iso_639_1: "fr", name: "French" },
      { iso_639_1: "de", name: "German" },
    ],
    status: "Released",
    tagline: "Tagline for Movie 2",
    title: "Movie 2",
    video: false,
    vote_average: 7.5,
    vote_count: 800,
  },
];


const additionalFakeMovies: MovieDB.Responses.Movie.GetDetails[] = [
  {
    id: 3,
    adult: false,
    backdrop_path: "/defaultBackdrop3.jpg",
    belongs_to_collection: null,
    budget: 0,
    genres: [
      { id: 5, name: "Science Fiction" },
      { id: 6, name: "Thriller" },
    ],
    homepage: "http://movie3.com",
    imdb_id: "tt333333",
    original_language: "en",
    original_title: "Movie 3",
    overview: "Overview of Movie 3",
    popularity: 75.5,
    poster_path: "/poster3.jpg",
    production_companies: [
      { name: "Company E", id: 105, logo_path: "/companyE_logo.jpg", origin_country: "FR" },
      { name: "Company F", id: 106, logo_path: "/companyF_logo.jpg", origin_country: "JP" },
    ],
    production_countries: [
      { iso_3166_1: "FR", name: "France" },
      { iso_3166_1: "JP", name: "Japan" },
    ],
    release_date: "2023-03-20",
    revenue: "30000000",
    runtime: 110,
    spoken_language: [
      { iso_639_1: "ja", name: "Japanese" },
      { iso_639_1: "zh", name: "Chinese" },
    ],
    status: "Released",
    tagline: "Tagline for Movie 3",
    title: "Movie 3",
    video: false,
    vote_average: 7.8,
    vote_count: 900,
  },
  // Add more fake movies as needed
];


describe("SimilarMovies Component", () => {
  it("renders SimilarMovies correctly with movie data", () => {
    render(<SimilarMovies movies={fakeMovies} />);

    const heading = screen.getByText("Similar Movies");
    expect(heading).toBeInTheDocument();

    fakeMovies.forEach((movie) => {
      const movieTitle = screen.getByText(movie.title);
      expect(movieTitle).toBeInTheDocument();
    });
  });


  it("renders SimilarMovies correctly with multiple movie data sets", () => {
    render(<SimilarMovies movies={[...fakeMovies, ...additionalFakeMovies]} />);

    const heading = screen.getByText("Similar Movies");
    expect(heading).toBeInTheDocument();

    const allMovies = [...fakeMovies, ...additionalFakeMovies];
    allMovies.forEach((movie) => {
      const movieTitle = screen.getByText(movie.title);
      expect(movieTitle).toBeInTheDocument();

      // Add more assertions based on your component structure
    });
  });


});

describe("SimilarMoviesSkeleton Component", () => {

  it("does not render a forbidden text in the skeleton", () => {
    render(<SimilarMoviesSkeleton />);
    const forbiddenText = "Forbidden Text";
    const forbiddenElement = screen.queryByText(forbiddenText);
    expect(forbiddenElement).not.toBeInTheDocument();
  });

  it("renders a loading state without crashing", () => {
    expect(() => {
      render(<SimilarMoviesSkeleton />);
    }).not.toThrow();
  });

  it("does not render a specific movie title in the skeleton", () => {
    render(<SimilarMoviesSkeleton />);
    const forbiddenText = "Forbidden Movie";
    const forbiddenTitle = screen.queryByText(forbiddenText);
    expect(forbiddenTitle).not.toBeInTheDocument();
  });
});
