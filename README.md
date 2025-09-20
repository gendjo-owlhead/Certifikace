# Test Suites

- **E2E Test** – complete user flow from registration to logout
- **API Test** – login token verification
- **Data Driven Tests** – account balance display checks
- **Atomic Tests** – dashboard header, menu and content
- **Visual Test** – dashboard snapshots and accessibility sweep

## Structure

```
├── src/pages
├── src/utils
├── tests/api
├── tests/atomic
├── tests/data-driven
├── tests/e2e
├── tests/visual
└── test-data
```

## Usage

Install dependencies and Playwright assets, then run the desired test script.

```bash
npm install
npm run test:install
npm test
```
