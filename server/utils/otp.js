import crypto from "crypto";

export function createOtp() {
  return crypto.randomInt(100000, 999999).toString();
}

export function hashOtp(code) {
  return crypto.createHash("sha256").update(code).digest("hex");
}
