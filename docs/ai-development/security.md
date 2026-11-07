# Security and trust boundaries

Repository inspection only, 2026-11-07. This is not a penetration test, dependency vulnerability scan, legal/privacy review, or audit of hosted protections.

## Implemented boundaries

All routes are public; no authentication, sessions, cookies, role checks, admin routes, or authorization integration exists in application source. Do not document or bypass a nonexistent login system. A future protected feature would require an explicit architecture decision.

The only application input crossing into server execution is [POST /api/contact](../../app/api/contact/route.ts), called by [ContactForm](../../components/ContactForm.tsx). Browser validation is a convenience, not a trust boundary. The handler parses arbitrary JSON and checks only required-field truthiness; [Data flow](data-flow.md) records exact responses. Quote fields stay in browser React state and are not submitted.

Contact names, email, phone and free-text message are logged to the server console. No persistence/email integration or retention policy is implemented in the repository. Hosting log access, retention, backups and downstream forwarding are unknown. Treat submitted values as personal/untrusted data; do not use real customer data for smoke tests.

## Verified controls and gaps

| Area | Evidence | Implication |
|---|---|---|
| Error response | Generic 400/500 JSON; no exception details returned | Avoids returning stack traces, but malformed JSON is treated as 500 |
| Input validation | No type, size, trim, email-format or schema checks | Truthy arrays/objects and whitespace can pass required checks |
| Abuse controls | No application rate limit, CAPTCHA, origin gate or body-size check in handler | Public endpoint may create unwanted log volume; platform controls/limits unknown |
| Output rendering | Quote name rendered as JSX text; no dangerouslySetInnerHTML or eval in app/components | No raw HTML insertion found; this is not proof against every injection class |
| Secret/config use | No process.env references in app/components; env files ignored by .gitignore | No application env contract currently exists; environment contents were not inspected |
| Security headers | Empty next.config.ts; no middleware/proxy or application header policy | Hosted/default headers unverified; do not assert their absence in production |
| External assets | Browser loads Unsplash photos | External availability/privacy dependency; live responses/policies unverified |

There is no evidence of a privileged authenticated CSRF target, stored database injection path, or payment processing. Do not invent those risks. Dependency advisories were not checked, so installed version numbers are not a security assessment.

## Future change contract (proposed controls)

For an authorized lead-delivery change, validate an explicit request shape and bounded strings on the server; decide email/phone/business requirements rather than inventing them. Establish honest success meaning, avoid unnecessary personal-data logging, and define failure/retry semantics. Choose abuse controls appropriate to the deployment after inspecting actual platform protections. Any new provider, dependency, environment variable or endpoint needs authorization and documentation.

Never copy secrets/environment values into docs or client code. If auth is introduced, document authentication separately from authorization and enforce access on the server. Keep errors safe and preserve customer input without exposing it in telemetry. Owner confirmation is needed for business contact details, privacy terms and confidentiality/response promises. Prioritized findings: [Known issues](known-issues.md).
