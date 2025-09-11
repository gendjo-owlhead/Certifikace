# Contributing to Certifikace2

Thank you for your interest in contributing to this project!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/certifikace2.git`
3. Switch to cert_branch: `git checkout cert_branch`
4. Install dependencies: `npm install`
5. Install Playwright browsers: `npx playwright install`

## Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test suite
npx playwright test tests/e2e/
npx playwright test tests/api/
npx playwright test tests/data-driven/
npx playwright test tests/atomic/
npx playwright test tests/visual/

# Run tests in headed mode
npx playwright test --headed

# Generate test report
npx playwright show-report
```

## Test Structure

- **E2E Tests**: Complete user workflows
- **API Tests**: Backend API validation
- **Data-Driven Tests**: Testing with multiple data sets
- **Atomic Tests**: Individual component testing
- **Visual Tests**: UI screenshot comparisons

## Code Style

- Use TypeScript
- Follow existing patterns in page objects
- Keep tests simple and readable
- Use meaningful test descriptions
- No comments or decorative elements in code

## Submitting Changes

1. Create a feature branch from cert_branch
2. Make your changes
3. Run tests to ensure they pass
4. Submit a pull request to cert_branch

## Questions?

Feel free to open an issue for any questions or discussions.
