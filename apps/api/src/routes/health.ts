import { router, procedure } from "../trpc.js";

export const healthRouter = router({
  getHealth: procedure.query(() => {
    return { success: true, health: "ok" };
  }),
});
