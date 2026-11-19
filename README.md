# Node Workspace Solutions

NWS is a marketing and product-catalogue website for Node Workspace Solutions, an ergonomic office-furniture company based in Chennai, India. Visitors can browse chair collections, review workspace services, learn about the company, and start a quote or contact enquiry.

The intended production domain is `nwsworkspace.com`, with Vercel as the deployment target. Hosting configuration and deployment health are not managed in this repository.

## Stack

- Next.js 16 App Router with React 19
- TypeScript in strict mode
- Tailwind CSS v4 through `@tailwindcss/postcss`
- npm and Node.js

Page content is currently defined in the route files. There is no database, CMS, authentication, checkout, or external content API.

## Local development

Use npm to install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The project does not declare a Node engine requirement; Node 24 was used for the latest local verification.

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

`start` serves an existing production build: run `npm run build` successfully first. For everyday editing, use `npm run dev`. There is no configured test runner or formatter. See [validation results and manual checks](docs/ai-development/testing-and-validation.md).

## Routes

| Route | Purpose |
|---|---|
| `/` | Home, categories, guided seating finder and FAQs |
| `/products` | Showroom catalogue grouped by category, with a URL category filter |
| `/company` | NWS story and selection approach |
| `/services` | Workspace services and process |
| `/quote` | Product-aware enquiry draft and email handoff |
| `/contact` | Contact details and enquiry draft |
| `/about` | Brand introduction |
| `/api/contact` | Legacy logging-only POST; no current UI caller |

The root layout mounts the shared header and footer for every page. Product filtering uses `type` or `category` query parameters, for example `/products?type=Executive`.

The 2026-11-19 design is a white seating showroom: near-black type, charcoal selection and bright yellow primary actions, with chairs aligned on a common baseline using framed copies of the original photos. The brand name appears as text in place of the logo artwork. See the [design contract](docs/ai-development/design-system.md).

## Implementation and limitations

Pages and page-local content live in `app/`; shared components live in `components/`; images live in `public/`. The root layout owns navigation and footer. No database, CMS, authentication, or checkout is implemented.

**Enquiries use an email handoff:** visitors review a locally prepared draft, then open their email app or copy the text and send it themselves. There is no automatic delivery or storage. The legacy contact API remains public and logs only; the UI does not call it. Existing phone/email details need owner verification before launch. See the [prioritized issue register](docs/ai-development/known-issues.md).

## Repository documentation

Agents start with [AGENTS.md](AGENTS.md), then select task-specific context from its index. Human readers can begin with [AI/product context](docs/ai-development/ai-context.md) and the [task-to-file map](docs/ai-development/repository-map.md).

The [AI documentation](docs/ai-development/ai-context.md) separates implementation facts from proposed improvements and records validation limits. Application source remains the authority for current behavior.
