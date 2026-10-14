import assert from "node:assert/strict";
import { test } from "node:test";
import {
  createToken,
  hashToken,
  hashPassword,
  verifyPassword,
  isToken,
} from "../lib/auth/crypto.ts";
import {
  normalizedEmail,
  validName,
  validPassword,
} from "../lib/auth/validation.ts";

test("passwords use independent salts and reject wrong or malformed credentials", async () => {
  const password = "A private test passphrase 2026";
  const first = await hashPassword(password);
  const second = await hashPassword(password);
  assert.notEqual(first, second);
  assert.ok(!first.includes(password));
  assert.equal(await verifyPassword(password, first), true);
  assert.equal(await verifyPassword("incorrect password", first), false);
  assert.equal(await verifyPassword(password, "not-a-valid-hash"), false);
});

test("bearer tokens have sufficient entropy and only hashes are persistence keys", () => {
  const first = createToken(),
    second = createToken();
  assert.ok(isToken(first));
  assert.notEqual(first, second);
  assert.match(hashToken(first), /^[a-f0-9]{64}$/);
  assert.notEqual(hashToken(first), first);
  assert.equal(isToken("demo-invitation"), false);
  assert.equal(isToken("<script>"), false);
});

test("account input validation preserves passphrases and normalizes email identity", () => {
  assert.equal(normalizedEmail(" STAFF@Example.com "), "staff@example.com");
  assert.equal(normalizedEmail("x\r\n@example.com"), "");
  assert.equal(normalizedEmail({ email: "staff@example.com" }), "");
  assert.equal(validPassword("a".repeat(14)), false);
  assert.equal(validPassword("a".repeat(129)), false);
  assert.equal(validPassword("A passphrase with spaces"), true);
  assert.equal(validName("   "), false);
});
