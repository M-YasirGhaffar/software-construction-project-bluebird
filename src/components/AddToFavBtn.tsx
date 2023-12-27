// Importing necessary dependencies
import { api } from "@/utils/api";
import { Heart, Trash, LucidePlaySquare, ExternalLink } from "lucide-react";
import type MovieDB from "node-themoviedb";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Component to add or remove a movie from favorites and play its trailer.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.movie - Movie details from The Movie Database.
 */
function AddToFavBtn({ movie }: { movie: MovieDB.Responses.Movie.GetDetails }) {
  // Using the API context to access utility functions
  const utils = api.useContext();

  // Query to check if the movie is already in favorites
  const {
    data: exist,
    error,
    isLoading,
  } = api.favorite.doesExist.useQuery({ movie_id: movie.id });

  // Mutation for adding a movie to favorites
  const AddMutation = api.favorite.add.useMutation({
    onMutate() {
      // Optimistically update local state
      utils.favorite.doesExist.setData({ movie_id: movie.id }, true);
      utils.favorite.get.setData(undefined, (prev) => {
        if (!prev) return prev;
        return [...prev, movie];
      });
    },
    onSuccess: async () => {
      // Refetch favorites after successful addition
      await utils.favorite.get.refetch();
    },
  });

  // Mutation for removing a movie from favorites
  const RemoveMutation = api.favorite.remove.useMutation({
    onMutate() {
      // Optimistically update local state
      utils.favorite.doesExist.setData({ movie_id: movie.id }, false);
      utils.favorite.get.setData(undefined, (prev) => {
        if (!prev) return prev;
        return [...prev].filter((m) => m.id !== movie.id);
      });
    },
    onSuccess: async () => {
      // Refetch favorites after successful removal
      await utils.favorite.get.refetch();
    },
  });

  // Handler to toggle between adding and removing from favorites
  const handleToggle = () => {
    if (exist) {
      RemoveMutation.mutate({ movie_id: movie.id });
    } else {
      AddMutation.mutate({
        movie_id: movie.id,
      });
    }
  };

  // UI rendering for error state
  if (error) {
    return <Button variant="destructiveOutline">Some Error Occurred</Button>;
  }

  // State for managing play button click and found key flag
  const [playClicked, setPlayClicked] = useState(false);
  const [foundKey, setFoundKey] = useState(false);

  // Handler to play the trailer of the movie
  const handlePlay = async () => {
    setPlayClicked(true);

    // Reset state after 3 seconds
    setTimeout(() => {
      setPlayClicked(false);
      setFoundKey(false);
    }, 3000);

    try {
      // Fetch movie details with videos from The Movie Database
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=151e4c68b02a7a70f9c920feb8b4d776&append_to_response=videos`
      );
      const data = await response.json();

      // Extract the desired key for the trailer
      const desiredKey = data?.videos?.results && data.videos.results[2]?.key;

      if (desiredKey) {
        // Open YouTube link with the desired key
        window.open(`https://www.youtube.com/watch?v=${desiredKey}`);
      } else {
        console.error("Desired key not found in the response.");
        setFoundKey(true);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  // UI rendering for the component
  return (
    <>
      {/* Button to add or remove from favorites */}
      <Button
        variant={exist ? "destructiveOutline" : "default"}
        isLoading={
          isLoading || AddMutation.isLoading || RemoveMutation.isLoading
        }
        disabled={
          isLoading || AddMutation.isLoading || RemoveMutation.isLoading
        }
        onClick={handleToggle}
        LeftIcon={exist ? Trash : Heart}
      >
        {isLoading
          ? "Loading.."
          : exist
          ? "Remove from favorites"
          : "Add to favorites"}
      </Button>

      {/* Button to play the trailer */}
      <Button
        onClick={handlePlay}
        style={{ margin: "0.5rem" }}
        RightIcon={ExternalLink}
      >
        Trailer |
      </Button>

      {/* Display a message if the production company doesn't allow playing the trailer */}
      <span>
        {foundKey && playClicked && (
          <p style={{ color: "red", fontSize: "0.75rem", fontStyle: "italic" }}>
            Production company of this movie didn't allow playing the trailer.
          </p>
        )}
      </span>
    </>
  );
}

// Exporting the component as default
export default AddToFavBtn;

/**
 * Skeleton component for AddToFavBtn while loading.
 */
export function AddToFavBtnSkeleton() {
  return (
    <div className="flex h-12 w-32 animate-pulse items-center justify-center rounded-md bg-gray-400">
      Loading...
    </div>
  );
}
