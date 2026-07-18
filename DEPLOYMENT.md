# Deployment

## Vercel

1. Import `https://github.com/adeelone/atlas`.
2. Set the environment variables from `.env.example`.
3. Use managed Postgres, Redis, and object storage.
4. Run `npm run build` as the build command.
5. Run Prisma migrations before first production use.

## Docker

```bash
cp .env.example .env
docker compose up --build
```

The compose file starts the app, worker, Postgres, Redis, and MinIO for local testing.

## Manual Action Required

- Create real Google OAuth credentials and set the callback URL for the deployed domain.
- Provide a strong `NEXTAUTH_SECRET`.
- Connect production Postgres and Redis.
- Configure object storage and encryption for uploaded documents.
- Add real provider credentials for live flight, hotel, activity, geocoding, and map providers.
- Configure a deployment domain and DNS if needed.
