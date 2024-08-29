import { httpBatchLink } from "@trpc/client";

import { createCaller } from "@/server";
import { URL } from "./settings";
export const serverClient = createCaller({
  links: [
    httpBatchLink({
      url: `${URL.DEV}/api/trpc`,
    }),
  ],
});