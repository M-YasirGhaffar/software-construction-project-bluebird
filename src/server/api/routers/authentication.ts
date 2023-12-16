import { TRPCError } from "@trpc/server";
import { hash } from "argon2";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { SignUpSchema } from "@/utils/ValidationSchema";
