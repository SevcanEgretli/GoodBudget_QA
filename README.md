# GoodBudget QA Take-Home Challenge

This project includes exploratory testing session document, UI end-to-end and API test automation framework for [GoodBudget](https://goodbudget.com) web application, powered by **Cypress**, **Cucumber**, and **Docker**.

## 🔧 Technologies Used

* [Cypress](https://www.cypress.io/)
* [Cypress Cucumber Preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)
* [Mochawesome](https://github.com/adamgruber/mochawesome)
* [Docker](https://www.docker.com/)
* [GitHub Actions](https://github.com/features/actions) for CI

---

## 📦 Installation

Clone the project and install dependencies:

```bash
git clone https://github.com/SevcanEgretli/goodbudget-qa.git
cd goodbudget-qa
npm ci
```

---

## ✨ Running Tests Locally

### ✅ 1. Run All Tests

```bash
npm run test:all
```

This command runs all tests by using Cypress and created JSON reports. Merged HTML reports is located at `cypress/reports/html/report.html`

### 🐞 2. Run Tests (excluding `@ignore` tagged ones)

```bash
npm run test
```

### 🐞 3. Run Tests headed browser

```bash
npx cypress run --headed --browser chrome
```

---

## 🐳 Run with Docker

Make sure Docker is running on your machine. If you don't have Docker setup you can install from [Docker Docs](https://docs.docker.com/desktop/setup/install/mac-install/) Then:

```bash
docker compose up --build
```

This builds a Docker image and runs tests in a containerized environment.

---

## 📁 Folder Structure

```
└── cypress/
    ├── integration/            # Feature files based on API or UI tests
    ├── support/
    │   ├── commands.ts         # Custom Cypress commands
    │   ├── step_definitions    # Test step connections with TS codes 
    │   └── helpers/            # Utility functions (e.g., cookie + payload utils)
    └── reports/                # Mochawesome reports
├── Dockerfile
├── docker-compose.yml
├── qa.config.ts                # QA-specific Cypress config
├── cypress.config.ts           # Base Cypress config
├── package.json
└── README.md
```

---

## 📊 Reports

After running `npm run test:all`, the test report can be found at:

```
cypress/reports/html/report.html
```

Reports created by Mockawesome in JSON format and merged. Open it in a browser to view detailed test results.

---


## 💪 GitHub Actions

GitHub Actions is configured to run tests on every push and pull request. The generated HTML report is uploaded as an artifact automatically. Also provides screenshots when an error displays.
