import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import DiscoverGrid from "../src/components/DiscoverGrid";
import MovieDB from "node-themoviedb";

const mockMovies: MovieDB.Responses.Movie.GetDetails[] = [
    {
      id: 1,
      adult: false,
      backdrop_path: "/backdrop1.jpg",
      belongs_to_collection: null,
      budget: 0,
      genres: [
        { id: 1, name: "Action" },
        { id: 2, name: "Adventure" },
      ],
      homepage: "http://mockmovie1.com",
      imdb_id: "tt123456",
      original_language: "en",
      original_title: "Mock Movie 1",
      overview: "Overview of Mock Movie 1",
      popularity: 75.6,
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
      tagline: "Tagline for Mock Movie 1",
      title: "Mock Movie 1",
      video: false,
      vote_average: 7.5,
      vote_count: 1000,
    },
    {
      id: 2,
      adult: false,
      backdrop_path: "/backdrop2.jpg",
      belongs_to_collection: {
        id: 201,
        name: "Collection X",
        poster_path: "/collectionX_poster.jpg",
        backdrop_path: "/collectionX_backdrop.jpg",
      },
      budget: 0,
      genres: [
        { id: 3, name: "Drama" },
        { id: 4, name: "Romance" },
      ],
      homepage: "http://mockmovie2.com",
      imdb_id: "tt987654",
      original_language: "en",
      original_title: "Mock Movie 2",
      overview: "Overview of Mock Movie 2",
      popularity: 98.2,
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
      tagline: "Tagline for Mock Movie 2",
      title: "Mock Movie 2",
      video: false,
      vote_average: 8.0,
      vote_count: 800,
    },
    // Add more mock movie entries as needed
  ];
  
  

describe("DiscoverGrid Component", () => {
  it("renders DiscoverGrid correctly with popular movies", () => {
    render(<DiscoverGrid type="POPULAR" movies={mockMovies} />);
    const titleElement = screen.getByText("Popular");
    expect(titleElement).toBeInTheDocument();

    // Add more assertions based on your component's behavior
  });

  it("renders DiscoverGrid correctly with top-rated movies", () => {
    render(<DiscoverGrid type="TOPRATED" movies={mockMovies} />);
    const titleElement = screen.getByText("Top Rated");
    expect(titleElement).toBeInTheDocument();

    // Add more assertions based on your component's behavior
  });

  it("renders DiscoverGrid correctly with now playing movies", () => {
    render(<DiscoverGrid type="NOWPLAYING" movies={mockMovies} />);
    const titleElement = screen.getByText("Now Playing");
    expect(titleElement).toBeInTheDocument();

    // Add more assertions based on your component's behavior
  });

  it("renders DiscoverGrid correctly with upcoming movies", () => {
    render(<DiscoverGrid type="UPCOMING" movies={mockMovies} />);
    const titleElement = screen.getByText("Upcoming");
    expect(titleElement).toBeInTheDocument();

    // Add more assertions based on your component's behavior
  });

  it("renders DiscoverGrid with custom movie data", () => {
    const customMovies: MovieDB.Responses.Movie.GetDetails[] = [
      // Define your custom movie data for this test
    ];

    render(<DiscoverGrid type="TOPRATED" movies={customMovies} />);
    const titleElement = screen.getByText("Top Rated");
    expect(titleElement).toBeInTheDocument();

  });

  it("renders DiscoverGrid correctly with custom movie data", () => {
    const customMovies: MovieDB.Responses.Movie.GetDetails[] = [
    ];

    render(<DiscoverGrid type="UPCOMING" movies={customMovies} />);
    const titleElement = screen.getByText("Upcoming");
    expect(titleElement).toBeInTheDocument();

  });

  it("renders DiscoverGrid correctly with original DiscoverGrid component", () => {
    render(<DiscoverGrid type="POPULAR" movies={mockMovies} />);
    const titleElement = screen.getByText("Popular");
    expect(titleElement).toBeInTheDocument();

  });

});
