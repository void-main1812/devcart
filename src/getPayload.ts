import dotenv from "dotenv";
import path from "path";
import payload from "payload";
import { InitOptions } from "payload/config";

dotenv.config({
  // __dirname is the directory of the current file & '../.env' is the path to the .env file from this directory
  path: path.resolve(__dirname, "../.env"),
});

// The global object is a special object that is available everywhere in your application, we are caching the payload client here by attaching it to the global object
let cached = (global as any).payload;

if (!cached) {
  cached = (global as any).payload = { client: null, promise: null };
}

interface Args {
  initOptions?: Partial<InitOptions>; //  Partial makes all properties of InitOptions optional (so we can pass in an empty object). InitOptions is the type of the initOptions property on the payload client
}

//  The getPayloadClient function will return the cached payload client if it exists, otherwise it will create a new payload client and cache it
export const getPayloadClient = async ({ initOptions }: Args) => {
  // If the PAYLOAD_SECRET is missing from the .env file, throw an error
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET is missing from");
  }
  //  If the cached client exists, return it
  //  cached client = the payload client that we have already created and cached on the global object
  if (cached.client) {
    return cached.client;
  }

  //  If the cached promise exists, return it
  //  cached promise = the promise returned from the payload init function that we have already created and cached on the global object (this promise will resolve to the payload client)
  if (!cached.promise) {
    cached.promise = payload.init({
      secret: process.env.PAYLOAD_SECRET,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    });
  }

  //  If the cached promise exists, return it
  //  cached promise = the promise returned from the payload init function that we have already created and cached on the global object (this promise will resolve to the payload client)
  try {
    cached.client = await cached.promise;
  } catch (error: unknown) {
    cached.promise = null;
    throw error;
  }

  //  Return the cached client
  return cached.client;
};
