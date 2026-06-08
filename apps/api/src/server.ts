import express from "express";
import cors from "cors";
import type { Request, Response } from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { t } from "./trpc.js";
import { healthRouter } from "./routes/health.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

export const appRouter = t.router({
  health: healthRouter,
});

export type AppRouter = typeof appRouter;

export type Context = {
  req: Request;
  res: Response;
};

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions): Context => ({ req, res });

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.listen(8000, () => {
  console.log("[SERVER] Running @ http://localhost:8000");
});
