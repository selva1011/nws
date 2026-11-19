# Security and trust boundaries

Source review **2026-11-18**; not a penetration test, vulnerability scan, legal review or hosted-settings audit.

## Current frontend

All pages are public. No application authentication, session, account, database, payment or checkout exists.

[ContactForm](../../components/ContactForm.tsx) keeps personal input in local browser fields/state. It prepares a plain-text draft; the visitor explicitly chooses an encoded mailto link or clipboard action. Preparing a draft does not call the legacy API. No analytics or persistence receives these form values. Input is not embedded in site query strings. Clipboard access can fail; a selectable textarea provides the fallback.

[Quote](../../app/quote/page.tsx) reads untrusted `models` query input, limits it to three comma-separated IDs and resolves them against the local catalogue. Unknown IDs are ignored. Only catalogue-owned names reach the form. JSX renders text safely. JSON-LD uses JSON.stringify and escapes `<`; the presence of structured-data scripts is not arbitrary HTML rendering.

Mounted images are local next/image assets. No new remote image host, font service, provider credential or environment variable was introduced. Existing phone/email ownership remains unverified.

## Legacy endpoint remains public

[POST /api/contact](../../app/api/contact/route.ts) has no current UI caller, but remains independently reachable. It accepts JSON, checks required-field truthiness and logs name/email/phone/message. It does not validate types, bound lengths, trim values, send email or store leads. Malformed JSON is treated as 500. No application rate limiting, CAPTCHA or body limit is implemented; hosting protections are unknown.

The redesigned frontend does not fix or secure this endpoint. Log access/retention/downstream forwarding are unknown. Never use real customer data in smoke tests. The endpoint is recorded in [Known issues](known-issues.md) for a deliberate retire-or-implement decision.

## Future integration rules

Agree destination, fields, success meaning and retention before adding a delivery provider. Validate bounded strings on the server; browser constraints are not a security boundary. Preserve input on delivery errors, avoid unnecessary personal-data logging, and verify actual downstream receipt before claiming delivery.

No process.env reads are currently required by app/components. Never copy environment values into docs or client code. Authentication, secret, dependency or hosting changes require their own concrete scope. Generic failures should not expose server internals. Platform headers and dependency advisories remain unverified.
