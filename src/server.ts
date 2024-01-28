import express from "express";
import { getPayloadClient } from "./getPayload";
import { nextApp, nextHandler } from "./next-utils";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";
import { inferAsyncReturnType } from "@trpc/server";
import bodyParser from "body-parser";
import { IncomingMessage } from "http";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
});

export type ExpressContext = inferAsyncReturnType<typeof createContext>;

export type WebhookRequest = IncomingMessage & { rawBody: Buffer };

const start = async () => {
  const webHookMiddleware = bodyParser.json({
    verify: (req: WebhookRequest, _, buffer) => {
      req.rawBody = buffer;
    },
  });

  /*TODO: app.post("/api/webhooks/stripe", webHookMiddleware, stripeWebhookHandler)*/

  // Invoke the getPayloadClient function to connect with payload cms
  const payload = await getPayloadClient({
    // Pass in the express app to the initOptions so that payload cms can serve the admin panel
    initOptions: {
      express: app,
      onInit: async (cms) => {
        // Log the admin URL to the console
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  });

  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info("Next.js is ready to rock 🚀");

    app.listen(PORT, () => {
      payload.logger.info(
        `Next.js App URL ${process.env.NEXT_PUBLIC_SERVER_URL}`
      );
    });
  });
};

start();
