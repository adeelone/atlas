# Contributing

Thanks for taking a look at Atlas. This is still early, so small focused PRs are easiest to review.

## Setup

```bash
npm install
cp .env.example .env
npm run typecheck
npm test
```

## Branch Names

Use a short branch name with one of these prefixes:

- `feat/`
- `fix/`
- `chore/`
- `docs/`
- `test/`

Example:

```text
feat/calendar-export
```

## Commits

Use Conventional Commits:

```text
feat: add hotel provider interface
fix: keep locked anchors in place
docs: update local setup notes
```

## Before Opening A PR

Run:

```bash
npm run typecheck
npm test
npm run build
```

If you changed formatting, run:

```bash
npm run format
```

## PR Flow

1. Describe what changed and why.
2. Link any issue it closes.
3. Include screenshots for UI changes.
4. Wait for CI before requesting review.
