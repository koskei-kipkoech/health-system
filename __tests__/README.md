# Health Information System Tests

This directory contains comprehensive tests for the Health Information System application. The tests cover all the core functionalities required in the system:

- Client registration
- Health program creation
- Client enrollment in programs
- Client search functionality
- Client profile viewing
- API exposure of client profiles

## Test Structure

### API Tests

- `__tests__/api/clients.test.ts`: Tests for client registration and retrieval API endpoints
- `__tests__/api/programs.test.ts`: Tests for program creation and management API endpoints
- `__tests__/api/client-profile.test.ts`: Tests for client profile API exposure

### Component Tests

- `__tests__/client-enrollment.test.tsx`: Tests for client enrollment in health programs
- `__tests__/client-profile.test.tsx`: Tests for client profile display
- `__tests__/client-search.test.tsx`: Tests for client search functionality
- `__tests__/program-creation.test.tsx`: Tests for health program creation

## Running Tests

To run the tests, use the following commands:

```bash
# Install dependencies if you haven't already
npm install

# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Coverage

The tests aim to provide comprehensive coverage of the application's functionality, including:

- Unit tests for individual components
- Integration tests for API endpoints
- Error handling and edge cases
- Form validation

## Test Environment

The tests use the following libraries:

- Jest: Test runner and assertion library
- React Testing Library: For testing React components
- Mock Service Worker (MSW): For mocking API requests

## Adding New Tests

When adding new features to the application, please follow these guidelines for creating tests:

1. Create unit tests for new components
2. Add API tests for new endpoints
3. Update existing tests when modifying functionality
4. Ensure all tests pass before submitting changes

## Security Testing

The test suite includes validation of security measures such as:

- Input validation
- Error handling
- Authentication checks (where applicable)
- Data integrity
