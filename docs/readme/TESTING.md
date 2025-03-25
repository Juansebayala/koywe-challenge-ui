# Testing

## Why

Testing is crucial for maintaining code quality and ensuring reliable functionality. In our application, we use end-to-end testing with Playwright to validate the complete user journey and ensure all components work together correctly. This approach helps us catch issues early and maintain a robust codebase by testing real user interactions and scenarios.

## How

We use Playwright as our testing framework, which allows us to test our application in real browser environments. Our tests cover key user flows including:

- Authentication (Login/Register)
- Dashboard functionality
- Quote creation and search
- Error handling and validation
- Navigation and routing

We mock API responses to simulate different scenarios and test error handling. This approach allows us to test our frontend logic without depending on a real backend, while still ensuring our code handles API interactions correctly.

```
npm run test
# Runs all Playwright tests in headless mode.

npm run test:ui
# Opens Playwright's UI mode for running and debugging tests interactively.

npm run test:debug
# Runs tests in debug mode with step-by-step execution for troubleshooting.
```
