import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getMovieDetails } from "@/utils/GetMovieData";
import { AddToFavoriteSchema } from "@/utils/ValidationSchema";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
