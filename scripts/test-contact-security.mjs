import assert from "node:assert/strict";
import {
  applyCors,
  escapeHtml,
  validateContactPayload,
} from "../api/lib/contact-security.js";

assert.equal(escapeHtml('<script>"&"</script>'), "&lt;script&gt;&quot;&amp;&quot;&lt;/script&gt;");

const valid = validateContactPayload({
  username: "Ada",
  email: "ada@example.com",
  remarks: "Hello there",
  info: "contact request",
  website: "",
});
assert.equal(valid.ok, true);
assert.equal(valid.data.email, "ada@example.com");

const honeypot = validateContactPayload({
  email: "bot@example.com",
  remarks: "spam",
  website: "https://spam.test",
});
assert.equal(honeypot.ok, false);
assert.equal(honeypot.honeypot, true);

const invalidEmail = validateContactPayload({
  email: "not-an-email",
  remarks: "Hello",
});
assert.equal(invalidEmail.ok, false);

const templateInvalid = validateContactPayload({
  email: "dev@example.com",
  info: "template submission",
  remarks: "Template submission\nRepository: not-a-url",
});
assert.equal(templateInvalid.ok, false);

const templateValid = validateContactPayload({
  email: "dev@example.com",
  info: "template submission",
  remarks: "Template submission\nRepository: https://github.com/you/repo",
});
assert.equal(templateValid.ok, true);

const mockRes = {
  headers: {},
  setHeader(name, value) {
    this.headers[name] = value;
  },
};
const mockReq = { headers: { origin: "http://localhost:5173" }, method: "OPTIONS" };
applyCors(mockReq, mockRes);
assert.equal(mockRes.headers["Access-Control-Allow-Origin"], "http://localhost:5173");

console.log("contact-security checks passed");
