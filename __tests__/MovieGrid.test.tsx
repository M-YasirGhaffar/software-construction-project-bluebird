import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import MovieGrid from "../src/components/MovieGrid";
import MovieDB from "node-themoviedb";

const TEST_MOVIES_DATA: MovieDB.Responses.Movie.GetDetails[] = [
    {
      adult: false,
      backdrop_path: "/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg",
      belongs_to_collection: null,
      budget: 100000000,
      genres: [
        {
          id: 18,
          name: "Drama",
        },
        {
          id: 36,
          name: "History",
        },
      ],
      homepage: "http://www.oppenheimermovie.com",
      id: 872585,
      imdb_id: "tt15398776",
      original_language: "en",
      original_title: "Oppenheimer",
      overview:
        "The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II.",
      popularity: 736.078,
      poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
      production_companies: [
        {
          id: 9996,
          logo_path: "/3tvBqYsBhxWeHlu62SIJ1el93O7.png",
          name: "Syncopy",
          origin_country: "GB",
        },
        {
          id: 33,
          logo_path: "/8lvHyhjr8oUKOOy2dKXoALWKdp0.png",
          name: "Universal Pictures",
          origin_country: "US",
        },
        {
          id: 507,
          logo_path: "/aRmHe6GWxYMRCQljF75rn2B9Gv8.png",
          name: "Atlas Entertainment",
          origin_country: "US",
        },
      ],
      production_countries: [
        {
          iso_3166_1: "GB",
          name: "United Kingdom",
        },
        {
          iso_3166_1: "US",
          name: "United States of America",
        },
      ],
      release_date: "2023-07-19",
      revenue: "649000000",
      runtime: 181,
      spoken_language: [
        {
          iso_639_1: "nl",
          name: "Nederlands",
        },
      ],
      status: "Released",
      tagline: "The world forever changes.",
      title: "Oppenheimer",
      video: false,
      vote_average: 8.3,
      vote_count: 1966,
    },
    // Add more mock movie data if needed
  ];
  

describe("MovieGrid Component", () => {
  it("renders movie grid correctly with no movies", () => {
    const { getByText } = render(<MovieGrid title="Test Movies" movies={[]} />);

    // Check if the title is rendered
    const titleElement = getByText("Test Movies");
    expect(titleElement).toBeInTheDocument();

    // Check if the "No movies found" message is rendered when there are no movies
    const noMoviesMessage = getByText("No movies found");
    expect(noMoviesMessage).toBeInTheDocument();
  });

  it("renders movie grid correctly with movies", () => {
    const { getByText, queryByTestId } = render(
      <MovieGrid title="Test Movies" movies={TEST_MOVIES_DATA} />
    );

    // Check if the title is rendered
    const titleElement = getByText("Test Movies");
    expect(titleElement).toBeInTheDocument();

  });

  it("renders each movie in the grid", () => {
    const { getByText } = render(
      <MovieGrid title="Test Movies" movies={TEST_MOVIES_DATA} />
    );

    TEST_MOVIES_DATA.forEach((movie) => {
      const movieElement = getByText(movie.title);
      expect(movieElement).toBeInTheDocument();
    });
  });

  it("does not render 'No movies found' when there are movies", () => {
    const { queryByText } = render(
      <MovieGrid title="Test Movies" movies={TEST_MOVIES_DATA} />
    );

    const noMoviesMessage = queryByText("No movies found");
    expect(noMoviesMessage).not.toBeInTheDocument();
  });

});
