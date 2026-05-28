# Walmart Mobile Browser Tests

Production-style Playwright tests for Walmart mobile web flows on BrowserStack real Android devices.

## Setup

```zsh
npm install
cp .env.example .env.local
```

Set your BrowserStack credentials in `.env.local`.

## Run

```zsh
npm run test:mobile
```

Useful scripts:

```zsh
npm test
npm run test:walmart:browserstack
npm run report
```

## Project Layout

```text
src/browserstack     BrowserStack Android connection and capabilities
src/config           Environment and runtime config
src/fixtures         Playwright fixtures for mobile BrowserStack sessions
src/pages            Walmart page objects
src/utils            Reusable test helpers
tests/mobile         Mobile browser specs
```

Each test gets one BrowserStack Android device session. Keep `workers=1` unless you provide one BrowserStack device per worker.
