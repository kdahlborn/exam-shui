# Copilot Instructions

## Project Structure

- This is a Serverless Framework AWS HTTP API using Node.js and ES modules.
- Define API routes and Lambda handlers in `serverless.yml`.
- Organize handlers by domain and operation under `functions/`.
- Keep each Lambda operation in its own folder with an `index.mjs` entry point.
- Put shared middleware in `middlewares/`, schemas in `models/`, response helpers in `responses/`, JWT helpers in `utils/`, and in-memory data in `data/`.

## Modules And Naming

- Use `.mjs` files and explicit ES module imports.
- Include the `.mjs` extension in relative imports.
- Use named exports for shared helpers and handlers.
- Preserve the existing default export for the question collection in `data/questions.mjs`.
- Use camelCase for functions, variables, handler folders, and schema names.
- Name schemas with the `Schema` suffix, such as `questionSchema` and `answerSchema`.

## Lambda Handlers

- Export each Lambda entry point as `export const handler`.
- Keep the operation's business logic inside its handler unless an existing shared utility is appropriate.
- Read request data from the Lambda event: `event.body`, `event.pathParameters`, and `event.queryStringParameters`.
- Use `sendResponse(statusCode, body)` for HTTP responses instead of constructing response objects independently.
- Update `serverless.yml` when adding or changing an API route.

## Middy And Middleware

- Wrap handlers with `middy(...)` when they need body parsing, validation, authentication, authorization, or centralized error handling.
- Use `@middy/http-json-body-parser` before code that reads a JSON request body.
- Use middleware in the established order where applicable:
    1. JSON body parser
    2. authentication
    3. role authorization
    4. body validation
    5. error handler
- Use `errorHandler()` as the final middleware for Middy-wrapped handlers.
- Keep simple read-only handlers without Middy when they do not need middleware.

## Responses And Errors

- `sendResponse` accepts an HTTP status code and a body, and serializes the body to JSON.
- Follow the existing response shapes and status codes used by neighboring handlers.
- Successful mutation responses generally include `success: true` and a message.
- Error response bodies generally include `success: false` and a message, but preserve the established shape of the operation being changed.
- Return expected business errors with `sendResponse` when that handler already follows this pattern.
- Throw `http-errors` from middleware for authentication, authorization, or validation failures so `errorHandler()` can format them.
- Use `errorHandler()` to map middleware errors to their status code, with a `500` fallback.

## Authentication And Authorization

- Use `authenticateUser()` for protected handlers.
- Authentication reads the `Authorization` or `authorization` header and verifies the bearer token with the JWT helper.
- Authentication stores the decoded token payload on `event.user`.
- Use `authorizeRole('admin')` for question create, update, and delete operations.
- Keep login public and use `signToken` with the existing username and role payload pattern.
- Read the JWT signing secret from `process.env.JWT_SECRET`; do not hardcode it.

## Validation

- Use Zod schemas from `models/` with `validateBody(schema)` for JSON request bodies.
- Place body parsing before validation.
- Let validation transform input consistently with the existing schemas, including trimming and lowercasing where defined.
- Add or update a schema in the relevant `models/` file instead of duplicating validation inside a handler.
- Preserve the existing schema style and user-facing validation messages.

## Data And State

- The current question and user data are in in-memory module arrays.
- Mutating question handlers update the imported `questions` array directly.
- Do not introduce a database or persistence layer unless explicitly requested.
- Preserve the existing question shape: `id`, `category`, `difficulty`, `question`, `options`, and `correctAnswer`.
- Public question responses should not expose `correctAnswer` where the existing handler removes it.

## Coding Style

- Use four spaces for indentation, semicolons, single quotes, and trailing commas in multiline structures.
- Prefer `const`; use `let` only when a value is reassigned.
- Prefer destructuring and arrow functions in the existing style.
- Keep changes focused and avoid unrelated refactoring.
- Do not add comments for self-explanatory code; preserve comments that document schema alternatives or grouped data.

## Commits

- Follow Conventional Commits as documented in `.github/COMMIT_GUIDELINES.md`.
- Use an allowed type such as `feat`, `fix`, `refactor`, or `docs`.
- Write commit descriptions in English, in the imperative mood, starting with lowercase and without a final period.
