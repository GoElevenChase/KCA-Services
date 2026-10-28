import assert from "node:assert/strict";
import test from "node:test";
import { buildEmailDraft, isAcceptedResponse, validateInquiry, type Inquiry } from "../src/lib/contact";

const valid: Inquiry = { name: "Avery", phone: "(210) 555-0123", service: "Plumbing", message: "The kitchen faucet is leaking.", website: "" };
test("inquiry validation rejects missing information and honeypot input", () => {
  assert.equal(validateInquiry(valid), null);
  assert.equal(validateInquiry({ ...valid, message: "" }), null);
  assert.ok(validateInquiry({ ...valid, phone: "12" }));
  assert.ok(validateInquiry({ ...valid, name: "" }));
  assert.ok(validateInquiry({ ...valid, website: "bot" }));
  assert.ok(validateInquiry({ ...valid, message: "a".repeat(4001) }));
});
test("email draft safely encodes message characters without inventing delivery", () => {
  const draft = buildEmailDraft("info@kcaservices.net", { ...valid, message: "Hello & welcome? Here is #our request." });
  const url = new URL(draft);
  assert.equal(url.protocol, "mailto:");
  assert.equal(url.pathname, "info@kcaservices.net");
  assert.equal(url.searchParams.get("subject"), "Service request: Plumbing");
  assert.match(url.searchParams.get("body")!, /Hello & welcome\? Here is #our request\./);
  assert.match(url.searchParams.get("body")!, /Phone: \(210\) 555-0123/);
  assert.throws(() => buildEmailDraft("info@kcaservices.net", { ...valid, phone: "bad" }));
});
test("only an explicit affirmative endpoint response counts as accepted", () => {
  assert.equal(isAcceptedResponse({ ok: true }), true);
  for (const value of [null, "ok", {}, { success: true }, { ok: false }, { ok: "true" }, { ok: 1 }]) assert.equal(isAcceptedResponse(value), false);
});
