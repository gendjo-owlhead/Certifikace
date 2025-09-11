# TEG#B Playwright Certification Testing Suite

Testovací projekt pro aplikaci TEG#B (bankovní aplikace) vytvořený v rámci Playwright certifikace.

## Zadání úlohy

Projekt obsahuje následující typy testů podle zadání:

1. **E2E Test** - Kompletní uživatelský flow
2. **API Test** - Test přihlašovacího API
3. **Data Driven Testy** - Kontrola různých částek na účtech
4. **Atomické testy** - Testy jednotlivých komponent dashboardu
5. **Vizuální test** - Kontrola vyplněného profilu s ARIA/Accessibility validací

## Project Structure

```
├── src/
│   ├── pages/           # Page Object Models
│   │   ├── base-page.ts
│   │   ├── login-page.ts
│   │   ├── register-page.ts
│   │   └── dashboard-page.ts
│   └── utils/           # Utilities and helpers
│       ├── api-client.ts
│       └── test-data.ts
├── tests/
│   ├── e2e/             # E2E testy
│   │   └── complete-user-flow.spec.ts
│   ├── api/             # API testy
│   │   └── login.spec.ts
│   ├── data-driven/     # Data Driven testy
│   │   └── account-balances.spec.ts
│   ├── atomic/          # Atomické testy
│   │   ├── dashboard-header.spec.ts
│   │   ├── dashboard-menu.spec.ts
│   │   └── dashboard-content.spec.ts
│   └── visual/          # Vizuální testy
│       └── profile-visual.spec.ts
├── test-data/           # Testovací data
│   └── account-balances.json
├── playwright.config.ts # Playwright configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies and scripts
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npm run test:install
   ```

## Running Tests

### Všechny testy
```bash
npm test
```

### E2E testy
```bash
npm run test:e2e
```

### API testy
```bash
npm run test:api
```

### Data Driven testy
```bash
npm run test:data-driven
```

### Atomické testy
```bash
npm run test:atomic
```

### Vizuální testy
```bash
npm run test:visual
```

### Debug Mode
```bash
npm run test:debug
```

### Headed Mode (See Browser)
```bash
npm run test:headed
```

### View Test Report
```bash
npm run test:report
```

## Test Coverage

### API Tests

#### Authentication (`tests/api/auth.spec.ts`)
- User registration with valid data
- Registration validation (duplicate email, missing fields)
- Login with valid credentials
- Login validation (invalid credentials, missing fields)

#### Profile Management (`tests/api/profile.spec.ts`)
- Get profile information
- Update profile with all fields
- Update profile with partial fields
- Clear profile fields (all and selective)
- Profile validation (age constraints, email format)
- Authentication requirements

#### Account Management (`tests/api/accounts.spec.ts`)
- Create new accounts
- Account validation (negative balance, missing fields)
- Get all accounts
- Change account balance (positive and negative amounts)
- Handle decimal amounts
- Non-existent account handling
- Authentication requirements

### UI Tests

#### Login Page (`tests/ui/login.spec.ts`)
- Page element visibility and layout
- Language switching (Czech/English)
- Form validation and error handling
- Successful login flow
- Navigation to registration

#### Dashboard (`tests/ui/dashboard.spec.ts`)
- Dashboard element visibility
- Navigation menu functionality
- Profile information display
- Account management UI
- Logout functionality
- Responsive design testing
- Session management

### Integration Tests (`tests/integration/end-to-end.spec.ts`)
- Complete user registration and login flow
- Profile management consistency between UI and API
- Account management end-to-end workflow
- Authentication state consistency
- Error handling consistency
- Data validation consistency
- Session timeout handling

## Configuration

### Application URLs
- Frontend: `https://tegb-frontend-88542200c6db.herokuapp.com/`
- Backend API: `https://tegb-backend-877a0b063d29.herokuapp.com`

### Test User Credentials
The tests use a predefined test user:
- Username: `petr.fifka`
- Password: `RuXvAbFsirC_'Ab'f%0U`

### Browser Configuration
Tests are configured to run on:
- Chromium (Desktop Chrome)
- Firefox (Desktop Firefox)
- WebKit (Desktop Safari)

## Key Features

### Page Object Model
- Modular and maintainable page objects
- Reusable components and methods
- Clear separation of concerns

### API Client
- Comprehensive API wrapper
- Automatic token management
- Type-safe request/response handling

### Test Data Management
- Random test data generation
- Configurable test users
- Data cleanup utilities

### Multi-language Support
- Tests handle both Czech and English interfaces
- Language switching validation

### Cross-browser Testing
- Tests run across multiple browsers
- Responsive design validation

## Best Practices Implemented

1. **Page Object Model**: Clean separation between test logic and page interactions
2. **API Testing**: Comprehensive API coverage with proper error handling
3. **Data-Driven Testing**: Parameterized tests with generated test data
4. **Integration Testing**: End-to-end workflows covering UI and API consistency
5. **Error Handling**: Proper validation of error scenarios
6. **Authentication**: Secure handling of login credentials and tokens
7. **Responsive Testing**: Multi-viewport testing for different screen sizes

## Reporting

Test results are generated in HTML format and can be viewed using:
```bash
npm run test:report
```

The report includes:
- Test execution results
- Screenshots on failures
- Trace files for debugging
- Performance metrics

## Troubleshooting

### Common Issues

1. **Browser Installation**: If tests fail to start, ensure browsers are installed:
   ```bash
   npm run test:install
   ```

2. **Network Issues**: Tests depend on external services. Ensure stable internet connection.

3. **Authentication**: If login tests fail, verify the test user credentials are still valid.

4. **Timeouts**: Increase timeout values in `playwright.config.ts` if tests are timing out.

## Contributing

When adding new tests:
1. Follow the existing page object pattern
2. Add appropriate type definitions
3. Include both positive and negative test scenarios
4. Update this README with new test descriptions
