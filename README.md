# Node Workspace Solutions

NWS is a Chennai office-furniture marketing and product-catalogue site built with Next.js App Router, React, TypeScript, and Tailwind CSS v4. Visitors browse seating categories, learn about services, and request a quote or contact the company.

The intended production domain is `nwsworkspace.com`; Vercel is the stated deployment target. Hosting configuration and deployment health have not been verified here.

## Local development

Use npm. Install dependencies only when needed:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The observed Node version is 24.18.1; the project does not declare an engine requirement. See [stack and product context](docs/ai-development/ai-context.md) for verified versions.

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

`start` serves the production build. There is no configured test runner or formatter. See [validation results and manual checks](docs/ai-development/testing-and-validation.md).

## Implementation and limitations

Pages and page-local content live in `app/`; shared components live in `components/`; images live in `public/`. The root layout owns navigation and footer. No database, CMS, authentication, or checkout is implemented.

**Lead delivery is incomplete:** the quote form only changes local state, and the contact API logs submissions without sending email or storing records. See the [prioritized issue register](docs/ai-development/known-issues.md) before relying on either workflow.

## Repository documentation

Agents start with [AGENTS.md](AGENTS.md), then select task-specific context from its index. Human readers can begin with [AI/product context](docs/ai-development/ai-context.md) and the [task-to-file map](docs/ai-development/repository-map.md).

The knowledge base preserves the existing `docs/ai-development/` structure. It separates implementation facts from proposed improvements and records validation limits; application source remains the evidence for implementation behavior.
