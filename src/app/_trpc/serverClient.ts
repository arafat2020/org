import { httpBatchLink } from "@trpc/client";

import { createCaller } from "@/server";
import { URLSet } from "./settings";
export const serverClient = createCaller({
  links: [
    httpBatchLink({
      url: `${URLSet.DEV}/api/trpc`,
    }),
  ],
});