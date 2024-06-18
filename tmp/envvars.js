import { config } from "dotenv-esm";

config();

// eslint-disable-next-line no-undef
export const metaAccessToken = process.env.META_ACCESS_TOKEN;
// eslint-disable-next-line no-undef
export const pixelId = process.env.PIXEL_ID;

console.log(`META_ACCESS_TOKEN: ${metaAccessToken}`);
console.log(`PIXEL_ID: ${pixelId}`);
