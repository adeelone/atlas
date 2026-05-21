# Atlas

<!-- Badges placeholder: add CI, coverage, release, and deploy badges after the repo is live. -->

Atlas is a travel-planner app experiment that turns a rough trip idea into an editable itinerary with cities, day plans, booked anchors, budgets, packing, and calendar export.

## Features

- Chat-style trip prompt on the home page.
- Step-by-step builder form.
- Paste box that extracts a locked anchor from simple confirmation text.
- Demo itinerary with day slots, fallback ideas, budget, packing, map placeholder, and ICS export.
- Provider interfaces for flights, hotels, activities, weather, geocoding, and maps.
- Planner helpers for city ordering, day allocation, anchor locking, conflicts, budgets, packing, and ICS generation.
- Docker setup with Postgres, Redis, and MinIO.

## Install

```bash
npm install
cp .env.example .env
```

On Windows PowerShell:

```powershell
copy .env.example .env
```

## Run

Local app:

```bash
npm run dev
```

Open `http://localhost:3000`.

Docker:

```bash
docker compose up
```

Optional database setup:

```bash
npm run migrate
npm run seed
```

## Test

```bash
npm run typecheck
npm test
npm run build
```

## Environment Variables

Copy `.env.example` to `.env` and fill in real values only for integrations you use.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection for Prisma |
| `REDIS_URL` | Redis cache and BullMQ jobs |
| `NEXTAUTH_URL` | Local or deployed app URL |
| `NEXTAUTH_SECRET` | NextAuth signing secret |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `RESEND_API_KEY` | Email provider key |
| `LLM_PROVIDER` | `mock`, `openai`, `anthropic`, or `ollama` |
| `OPENAI_API_KEY` | OpenAI key when enabled |
| `ANTHROPIC_API_KEY` | Anthropic key when enabled |
| `OLLAMA_BASE_URL` | Local Ollama endpoint |
| `MAP_PROVIDER` | `leaflet` or `mapbox` |
| `MAPBOX_TOKEN` | Mapbox token when enabled |
| `ENABLE_LIVE_MODE` | Enables the in-trip Today panel |
| `ENABLE_OCR_UPLOADS` | Enables OCR upload paths later |
| `ENABLE_PAID_PROVIDERS` | Enables paid provider adapters later |
| `MINIO_ENDPOINT` | Local document storage endpoint |
| `MINIO_ACCESS_KEY` | Local MinIO access key |
| `MINIO_SECRET_KEY` | Local MinIO secret key |

## Project Structure

```text
app/          Next.js pages and API routes
components/   UI pieces for planning and editing trips
lib/          planner logic, parsers, calendar, budget, config
providers/    flight, hotel, activity, weather, geocoding, map adapters
server/       tRPC router and request context
db/           Prisma schema and seed
workers/      BullMQ worker entrypoint
tests/        unit, component, integration, and E2E test scaffolding
prompts/      prompt templates for future real LLM calls
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Short version: make a branch, keep commits conventional, run typecheck and tests before opening a PR.

## Known Issues

- Real OAuth sign-in and Google Calendar writes are not wired yet.
- Flight, hotel, and activity providers return mock data.
- PDF generation, OCR uploads, and encrypted document storage are still TODOs.
- The map is a placeholder panel.
- Offline mobile mode is not built yet.

## License

MIT. See [LICENSE](LICENSE).
