import crypto from "crypto";

export const createHash = (data: string) => {
  return crypto.createHash("sha256").update(data, "utf-8").digest("hex");
};
