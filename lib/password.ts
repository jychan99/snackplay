import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);
const KEY_LENGTH = 32;

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;

  return `scrypt$${salt}$${derivedKey.toString("hex")}`;
}

export async function verifyPassword(password: string, storedPassword: string) {
  const [algorithm, salt, key] = storedPassword.split("$");

  if (algorithm !== "scrypt" || !salt || !key) {
    return false;
  } 

  const storedKey = Buffer.from(key, "hex");
  const derivedKey = (await scryptAsync(password, salt, storedKey.length)) as Buffer;

  return timingSafeEqual(storedKey, derivedKey);
}