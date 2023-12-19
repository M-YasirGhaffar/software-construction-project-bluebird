import { api } from "@/utils/api";
import { Heart, Trash } from "lucide-react";
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

  const [playClicked, handlePlayClicked] = useState(false);

  useEffect(() => {
      const timeout = setTimeout(() => {
        handlePlayClicked(false);
      }, 3000);

      return () => clearTimeout(timeout);
  }, [playClicked]);

  const handlePlay = () => {
    handlePlayClicked(true);
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
        style={{ marginLeft: ".5rem", backgroundColor: "grey" }}

        // isLoading={
        //   isLoading || AddMutation.isLoading || RemoveMutation.isLoading
        // }
        // disabled={
        //   isLoading || AddMutation.isLoading || RemoveMutation.isLoading
        // }
        LeftIcon={Play}
        onClick={handlePlay}
      >
        Play
      </Button>

        <span style={{ display: "flex", flexWrap: "wrap" }}>
          {playClicked && (
            <p style={{ color: "red", margin: ".5rem", fontSize:'.75rem' }}>
              <em>Watching movies is not free. This button is just a placeholder.</em>
            </p>
          )}
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
