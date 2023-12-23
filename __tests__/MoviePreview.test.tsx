import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MoviePreview, { MoviePreviewSkeleton } from "../src/components/MoviePreview";
import MovieDB from "node-themoviedb";

// Define a type for partial movie data for your test
type PartialMovieData = {
  id: number;
  title: string;
  poster_path: string;
  // ... other properties that are necessary for your component
};

const mockMovie: PartialMovieData = {
  id: 123,
  title: "Mock Movie Title",
  poster_path: "/mock-poster.jpg",
  // ... other properties
};

describe("MoviePreview Component", () => {
  it("renders movie preview correctly focusing on title", () => {
    // Use type assertion to indicate that mockMovie is of type GetDetails
    render(<MoviePreview movie={mockMovie as MovieDB.Responses.Movie.GetDetails} />);
  
    // Assertions based on your component's behavior
    const titleElement = screen.getByText("Mock Movie Title");
    
    expect(titleElement).toBeInTheDocument();
  });
  

  it("renders movie preview with different mock data", () => {
    const anotherMockMovie: PartialMovieData = {
      id: 456,
      title: "Another Mock Movie Title",
      poster_path: "/another-mock-poster.jpg",
      // ... other properties
    };

    // Use type assertion with different mock data
    render(<MoviePreview movie={anotherMockMovie as MovieDB.Responses.Movie.GetDetails} />);
    // Add assertions based on your component's behavior
  });

  it("renders MoviePreviewSkeleton when movie prop is not provided", () => {
    render(<MoviePreviewSkeleton />);
    // Add assertions based on how your skeleton component should appear
  });


  it("renders movie preview correctly focusing on poster", () => {
    // Use type assertion to indicate that mockMovie is of type GetDetails
    render(<MoviePreview movie={mockMovie as MovieDB.Responses.Movie.GetDetails} />);

    const posterElement = screen.getByAltText("Mock Movie Title Poster");
    expect(posterElement).toBeInTheDocument();

  });

  it("renders movie preview with different mock data again", () => {
    const anotherMockMovie: PartialMovieData = {
      id: 455,
      title: "Another Movie Title",
      poster_path: "/another-mock-poster-again.png",
      // ... other properties
    };

    // Use type assertion with different mock data
    render(<MoviePreview movie={anotherMockMovie as MovieDB.Responses.Movie.GetDetails} />);

    const titleElement = screen.getByText("Another Movie Title");
    expect(titleElement).toBeInTheDocument();

  });

});
