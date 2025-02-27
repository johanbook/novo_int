# Notes

Here are my notes from reading through the project.

## 3 things to improve

- Review security
- Add proper schema validation
- Add logging / alerting

## Alternative technologies

- Express is not actively maintained, migrate to newer framework such as
  Fastify.
  - jsonschema/class-validator for validation.
- Migrate to Typescript.
- Switch to an authentication provider. Either managed such as KeyClock or cloud
  as Auth0/PropelAuth.
- Add missing dev tooling (Eslint, Prettier, Husky, etc) + CI.
- Use Redux RTK for full type safety in Redux.

### Less important

- CRA is deprecated, migrate to Vite.

### Other

- Consider Postgres for tabular data.
- Bootstrap is good, but consider Tailwind.
- Split API and client into separate repositories.

## Improvements

Minor things

- Bcrypt implementation is susceptible to timing attacks.
- Consider moving to third party authentication service
- Use await/async syntax

## 1. Editing Documents

Exporting PDF

The challenge here is the PDF export which is where we should spend our R&D
efforts.

First approach would be to try to use the browser native API.

Fallback would be to do it serverside using
[pdf-lib](https://www.npmjs.com/package/pdf-lib) or similar.

Update data model

- Add fields Experience, Education, Skills
- Migrate old models to also have these fields

Update API endpoint

- Add PUT endpoint for updating document
- Extend POST endpoint to support new fields
- Add POST endpoint to create a document from a template.

PDF?

## 2. Production Readiness

How is the application intended to be deployed? On-prem or cloud? What is the
expected usage? Use Kubernetes or can we get away with Docker compose?

- Build and deploy app to CDN.
- Containerize it. Use Docker or similar to ready it for production.
- Logging/alerting. We need to set up logging both for client and API to be able
  to quickly catch bugs and regressions.
  - Metrics through Prometheus.
- Host MongoDB either managed or in cloud.
- Secret management. Secrets should not be hardcode and not be leaked into
  application logs.
  - Do nog log secrets into application logs (console.log("JWT_SECRET",
    JWT_SECRET))
- Schema validation. There should be proper schema validation in API for
  security and scalability. Should cover things as string formats (email, uuid),
  max numbers etc.
- Cache current user either in memory or in Redis to lower request timing and
  database load
- Add CI/CD pipeline.

## 3. Add Job Tracking

Update data model

- Add job application entity with fields
  - Status ((Applied, Interview, Offer, Rejected, etc.))
  - List of attached documents

I find the use case for this requirement a bit unclear:

- Users can create Documents (CV, Resume, Cover letter) from a created job
  application?
