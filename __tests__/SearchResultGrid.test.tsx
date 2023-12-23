import { render, screen } from "@testing-library/react";
import SearchResultGrid from "../src/components/SearchResultGrid"; // Update the path accordingly
import type MovieDB from "node-themoviedb";

// Mock data for testing
const mockMovies: MovieDB.Responses.Movie.GetDetails[] = [
    {
      adult: false,
      backdrop_path: "/backdrop1.jpg",
      belongs_to_collection: {
        id: 1,
        name: "Collection 1",
        poster_path: "/collection1.jpg",
        backdrop_path: "/backdropCollection1.jpg",
      },
      budget: 1000000,
      genres: [
        { id: 1, name: "Action" },
        { id: 2, name: "Drama" },
      ],
      homepage: "/homepage1",
      id: 1,
      imdb_id: "tt1234567",
      original_language: "en",
      original_title: "Original Title 1",
      overview: "Overview for Movie 1",
      popularity: 123.45,
      poster_path: "/poster1.jpg",
      production_companies: [
        {
          name: "Production Company 1",
          id: 101,
          logo_path: "/logo1.jpg",
          origin_country: "US",
        },
      ],
      production_countries: [
        {
          iso_3166_1: "US",
          name: "United States",
        },
      ],
      release_date: "2023-01-01",
      revenue: "2000000",
      runtime: 120,
      spoken_language: [
        {
          iso_639_1: "en",
          name: "English",
        },
      ],
      status: "Released",
      tagline: "Tagline for Movie 1",
      title: "Movie 1",
      video: true,
      vote_average: 8.5,
      vote_count: 100,
      // Add more properties as needed based on the actual GetDetails interface
    },
    {
      adult: false,
      backdrop_path: "/backdrop2.jpg",
      belongs_to_collection: null,
      budget: 1500000,
      genres: [
        { id: 3, name: "Comedy" },
        { id: 4, name: "Romance" },
      ],
      homepage: "/homepage2",
      id: 2,
      imdb_id: "tt7654321",
      original_language: "fr",
      original_title: "Original Title 2",
      overview: "Overview for Movie 2",
      popularity: 98.76,
      poster_path: "/poster2.jpg",
      production_companies: [
        {
          name: "Production Company 2",
          id: 202,
          logo_path: "/logo2.jpg",
          origin_country: "FR",
        },
      ],
      production_countries: [
        {
          iso_3166_1: "FR",
          name: "France",
        },
      ],
      release_date: "2023-02-15",
      revenue: "1800000",
      runtime: 105,
      spoken_language: [
        {
          iso_639_1: "fr",
          name: "French",
        },
      ],
      status: "Released",
      tagline: "Tagline for Movie 2",
      title: "Movie 2",
      video: false,
      vote_average: 7.8,
      vote_count: 85,
      // Add more properties as needed based on the actual GetDetails interface
    },
    // Add more mock movies as needed
  ];
  

describe("SearchResultGrid Component", () => {
  it("renders the title with the correct count", () => {
    render(<SearchResultGrid movies={mockMovies} query="test" />);
    const title = screen.getByText("Search Result : 2 results found");
    expect(title).toBeInTheDocument();
  });

  it("renders MovieGrid component with provided movies", () => {
    render(<SearchResultGrid movies={mockMovies} query="test" />);
    const movieGrid = screen.getByTestId("movie-grid"); // Add data-testid="movie-grid" to the MovieGrid component
    expect(movieGrid).toBeInTheDocument();
  });

  it("renders individual movie items", () => {
    render(<SearchResultGrid movies={mockMovies} query="test" />);
    const movieItems = screen.getAllByTestId("movie-item-test"); // Add data-testid="movie-item" to individual movie items
    expect(movieItems.length).toBe(mockMovies.length);
  });

  it("renders movie details correctly", () => {
    render(<SearchResultGrid movies={mockMovies} query="test" />);
    const movieTitle = screen.getByText("Movie 1");
    // const movieOverview = screen.getByText("Overview for Movie 1");
    // Add more assertions based on your actual component structure
    expect(movieTitle).toBeInTheDocument();
    // expect(movieOverview).toBeInTheDocument();
  });
  
});
