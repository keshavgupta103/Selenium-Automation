# Selenium E2E Automation

This repository contains an end-to-end (E2E) automation framework for testing a sample e-commerce web application ([https://www.saucedemo.com/](https://www.saucedemo.com/)) using Selenium WebDriver with JavaScript. The framework automates various scenarios, including login, adding items to the cart, filtering products, checking out, and logout.

## Prerequisites

1. **Node.js**: Ensure you have Node.js installed. Download it from [Node.js Official Website](https://nodejs.org/).
2. **Chrome Browser**: This project uses Chrome as the default browser.
3. **ChromeDriver**: Ensure you have ChromeDriver installed, and its version matches your Chrome browser version.
4. **dotenv Package**: Used for environment variables.
5. **Selenium WebDriver**: Installed via `npm`.

## Project Structure
```plaintext
|-- src/
    |-- loginPage.js
    |-- cartPage.js
    |-- checkoutPage.js
    |-- logoutPage.js
|-- .env
|-- package.json
|-- README.md
|-- index.js

Steps to Execute the Scripts

1. Clone the Repository

git clone https://github.com/keshavgupta103/Selenium-Automation


2. Install Dependencies

npm install

3. Run Individual Tests

To execute a specific test, use the following command:

node Tests/<TestFileName>.js

For example, to run the login test:

node Tests/CorrectLoginTest.js

4. Run All Tests

To execute all tests sequentially, run the master test script:

node Tests/RunAll.js

5. View Results

Test results and logs will be displayed in the terminal.

Assumptions

Test Data: The default credentials performance_glitch_user and secret_sauce are valid.

URL: The application URL is predefined in the Login.js file.

Browser: Tests are designed for the Chrome browser.

Dynamic Elements: Scripts handle dynamic elements using explicit waits and retries.

Observations

Click Interception: Issues with click interception were addressed by scrolling elements into view and waiting for them to become clickable.

Performance: Test execution may be slower on systems with high CPU usage due to dynamic waits.

Session Management: Reusable sessions are implemented to improve efficiency across tests.

Error Handling: Comprehensive error logging is integrated to capture execution issues.

Troubleshooting

Element Not Found: Ensure the web application is running and the UI has not changed.

Driver Issues: Verify the ChromeDriver version matches your Chrome browser version.

