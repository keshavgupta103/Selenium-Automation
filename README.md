# Selenium E2E Automation

This repository contains an end-to-end (E2E) automation framework for testing a sample e-commerce web application ([https://www.saucedemo.com/](https://www.saucedemo.com/)) using Selenium WebDriver with JavaScript. The framework automates various scenarios, including login, adding items to the cart, filtering products, checking out, and logout.

## Prerequisites

1. **Node.js**: Ensure you have Node.js installed. Download it from [Node.js Official Website](https://nodejs.org/).
2. **Chrome Browser**: This project uses Chrome as the default browser.
3. **ChromeDriver**: Ensure you have ChromeDriver installed and its version matches your Chrome browser version.
4. **dotenv Package**: For environment variables.
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
