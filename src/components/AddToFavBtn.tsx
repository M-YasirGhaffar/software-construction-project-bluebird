import { api } from "@/utils/api";
import { Heart, Trash, LucidePlaySquare, ExternalLink } from "lucide-react";
import type MovieDB from "node-themoviedb";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";

function AddToFavBtn({ movie }: { movie: MovieDB.Responses.Movie.GetDetails }) {
  const utils = api.useContext();
  const {
    data: exist,
    error,
    isLoading,
  } = api.favorite.doesExist.useQuery({ movie_id: movie.id });

  const AddMutation = api.favorite.add.useMutation({
    onMutate() {
      utils.favorite.doesExist.setData({ movie_id: movie.id }, true);
      utils.favorite.get.setData(undefined, (prev) => {
        if (!prev) return prev;
        return [...prev, movie];
      });
    },
    onSuccess: async () => {
      await utils.favorite.get.refetch();
    },
  });
  const RemoveMutation = api.favorite.remove.useMutation({
    onMutate() {
      utils.favorite.doesExist.setData({ movie_id: movie.id }, false);
      utils.favorite.get.setData(undefined, (prev) => {
        if (!prev) return prev;
        return [...prev].filter((m) => m.id !== movie.id);
      });
    },
    onSuccess: async () => {
      await utils.favorite.get.refetch();
    },
  });
  const handleToggel = () => {
    if (exist) {
      RemoveMutation.mutate({ movie_id: movie.id });
    } else {
      AddMutation.mutate({
        movie_id: movie.id,
      });
    }
  };

  if (error) {
    return <Button variant="destructiveOutline">Some Error Occured</Button>;
  }  

  const [playClicked, setPlayClicked] = useState(false);
  const [foundKey, setFoundKey] = useState(false);

  const handlePlay = async () => {
    setPlayClicked(true);
    setTimeout(() => {
      setPlayClicked(false);
      setFoundKey(false);
    }, 3000);

    try {
      // Fetch movie details with videos
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=151e4c68b02a7a70f9c920feb8b4d776&append_to_response=videos`
      );
      const data = await response.json();
  
      // Extract the desired key
      const desiredKey =
        data?.videos?.results && data.videos.results[2]?.key;
  
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

    // window.open(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=151e4c68b02a7a70f9c920feb8b4d776&append_to_response=videos`);
  };


  return (
    <>
      <Button
        variant={exist ? "destructiveOutline" : "default"}
        isLoading={
          isLoading || AddMutation.isLoading || RemoveMutation.isLoading
        }
        disabled={
          isLoading || AddMutation.isLoading || RemoveMutation.isLoading
        }
        onClick={handleToggel}
        LeftIcon={exist ? Trash : Heart}
      >
        {isLoading
          ? "Loading.."
          : exist
          ? "Remove from favorite"
          : "Add to favorite"}
      </Button>
      
      <Button
        onClick={handlePlay}
        style={ {margin: "0.5rem"} }
        RightIcon={ExternalLink}
      >
        Trailer |
      </Button>

      <span>
        { foundKey && playClicked && <p style={ {color:"red", fontSize:"0.75rem", fontStyle:"italic"} } >Production company of this movie didn't allow to play trailer.</p> }
      </span>

    </>
  );
}

export default AddToFavBtn;

export function AddToFavBtnSkeleton() {
  return (
    <div className="flex h-12 w-32 animate-pulse items-center justify-center rounded-md bg-gray-400">
      Loading...
    </div>
  );
}
