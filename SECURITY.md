# Security Policy

## Supported Versions

| Version | Supported |
| --- | --- |
| 0.1.x | Yes |

## Reporting A Vulnerability

Please do not open a public issue for security problems. Email `security-contact@example.com` with:

- A short description.
- Steps to reproduce if you have them.
- Impact and affected versions.
- Whether you have a suggested fix.

I will try to acknowledge reports within 3 business days and provide an update within 7 business days.

## Secrets

Secrets belong in environment variables. `.env` is ignored by Git.

## Data Handling

The local Docker setup includes MinIO, but real passport and visa uploads need encryption at rest. I would use envelope encryption with a managed KMS for that.

- Do not log confirmation numbers, passport files, or OAuth tokens.
- Do not store provider API keys in the database.
- Do not make public trip links permanent by default.
