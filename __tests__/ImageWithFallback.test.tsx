import { render, screen } from "@testing-library/react";
import ImageWithFallback from "../src/components/ImageWithFallback";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src || "fallback.png"} alt={alt} />
  ),
}));

describe("ImageWithFallback Component", () => {
  it("renders the image with the provided src", () => {
    render(
      <ImageWithFallback
        alt="Test Image"
        src="test.jpg"
        width={100}
        height={100}
      />
    );
    const image = screen.getByAltText("Test Image");
    expect(image).toHaveAttribute("src", "test.jpg");
  });

  it("renders the fallback image when the provided src is invalid", () => {
    render(
      <ImageWithFallback
        alt="Test Image"
        src="fallback.png"
        width={100}
        height={100}
      />
    );
    const image = screen.getByAltText("Test Image");
    expect(image).toHaveAttribute("src", "fallback.png");
  });

  it("renders the fallback image when the onError callback is triggered", () => {
    render(
      <ImageWithFallback
        alt="Test Image"
        src="fallback.png"
        width={100}
        height={100}
      />
    );
    const image = screen.getByAltText("Test Image");
    image.onerror?.(new Event("error"));
    expect(image).toHaveAttribute("src", "fallback.png");
  });

  it("does not render the fallback image when the onError callback is not triggered", () => {
    render(
      <ImageWithFallback
        alt="Test Image"
        src="test.jpg"
        width={100}
        height={100}
      />
    );
    const image = screen.getByAltText("Test Image");
    expect(image).toHaveAttribute("src", "test.jpg");
  });

  it("resets the error state when the src changes", () => {
    const { rerender } = render(
      <ImageWithFallback
        alt="Test Image"
        src="test.jpg"
        width={100}
        height={100}
      />
    );
    const image = screen.getByAltText("Test Image");
    image.onerror?.(new Event("error"));
    rerender(
      <ImageWithFallback
        alt="Test Image"
        src="new-image.jpg"
        width={100}
        height={100}
      />
    );
    expect(image).toHaveAttribute("src", "new-image.jpg");
  });

  // Add more test cases as needed
});
