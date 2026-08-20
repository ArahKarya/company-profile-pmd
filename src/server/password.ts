import {
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
  type ScryptOptions,
} from "node:crypto";

/** promisify() drops scrypt's options overload, so wrap it by hand. */
function scrypt(
  password: string,
  salt: Buffer,
  keylen: number,
  options: ScryptOptions,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scryptCallback(password, salt, keylen, options, (error, derived) =>
      error ? reject(error) : resolve(derived),
    );
  });
}

/**
 * Password hashing with scrypt from node:crypto.
 *
 * scrypt is memory-hard and in the standard library, so the template needs no native
 * password-hashing dependency and installs cleanly on every platform.
 *
 * Digests are stored as `scrypt$N$r$p$salt$hash`, both parts hex. Carrying the parameters
 * in the digest means the cost can be raised later without invalidating existing passwords.
 */
const PARAMS = { N: 2 ** 15, r: 8, p: 1, keylen: 64 } as const;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const derived = await scrypt(password, salt, PARAMS.keylen, {
    N: PARAMS.N,
    r: PARAMS.r,
    p: PARAMS.p,
    // scrypt needs its memory limit raised to match N; the default rejects N above 2^14.
    maxmem: 256 * PARAMS.N * PARAMS.r,
  });
  return `scrypt$${PARAMS.N}$${PARAMS.r}$${PARAMS.p}$${salt.toString("hex")}$${derived.toString("hex")}`;
}

export async function verifyPassword(password: string, digest: string): Promise<boolean> {
  const parts = digest.split("$");
  if (parts.length !== 6 || parts[0] !== "scrypt") return false;

  const [, nRaw, rRaw, pRaw, saltHex, hashHex] = parts;
  const N = Number(nRaw);
  const r = Number(rRaw);
  const p = Number(pRaw);
  if (!Number.isInteger(N) || !Number.isInteger(r) || !Number.isInteger(p)) return false;

  const expected = Buffer.from(hashHex, "hex");
  const derived = await scrypt(password, Buffer.from(saltHex, "hex"), expected.length, {
    N,
    r,
    p,
    maxmem: 256 * N * r,
  });

  // Both buffers are the same length by construction, so this compares in constant time.
  return timingSafeEqual(derived, expected);
}
