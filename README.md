# Selenium E2E Automation
This repository contains an end-to-end (E2E) automation framework for testing a sample e-commerce web application (https://www.saucedemo.com/) using Selenium WebDriver with JavaScript. The framework automates various scenarios, including login, adding items to the cart, filtering products, checking out, and logout.
# Prerequisites
1) Node.js: Ensure you have Node.js installed. Download it from Node.js Official Website.
2) Chrome Browser: This project uses Chrome as the default browser.
3) ChromeDriver: Ensure you have ChromeDriver installed and its version matches your Chrome browser version.
4) dotenv Package: For environment variables.
5) Selenium WebDriver: Installed via npm.

# Project Structure
|-- src/
    |-- loginPage.js
    |-- cartPage.js
    |-- checkoutPage.js
    |-- logoutPage.js
|-- .env
|-- package.json
|-- README.md
|-- index.js


## Setup
1. **Clone the Repository**

   Clone the project from GitHub to your local machine:
   ```bash
   git clone https://github.com/keshavgupta103/top-courses.git
Step 2: Install Dependencies
Install the required Node.js dependencies:

npm install selenium-webdriver dotenv
Step 3: Configure Environment Variables
Create a .env file in the project root and add the following:

# Credentials
USER_NAME=your_valid_username
USER_PWD=your_valid_password
WRONG_USER=invalid_username
WRONG_PWD=invalid_password

# Product Filter and Names
FILTER_BY=Price (low to high)
PRODUCTS_NAME=["Sauce Labs Backpack", "Sauce Labs Bike Light", "Sauce Labs Bolt T-Shirt"]

# Customer Details
CUS_FNAME=John
CUS_SNAME=Doe
CUS_PINCODE=12345

# Success Message
SUCCESS_MSG="Thank you for your order!"
Replace the placeholder values with actual test data.

Usage
Running the Tests
To execute the automation script, run the following command:

node index.js
Test Scenarios Covered
Invalid Login Test

Validates error messages when invalid credentials are entered.

Valid Login Test

Verifies successful login using valid credentials.

Add Items to Cart Test

Adds items to the cart from the product list and product details page.

Filter Products

Filters products based on the given criteria (e.g., price).

Remove Items from Cart

Removes items from the cart within a specified price range.

Checkout Flow

Automates the complete checkout process, including form filling, total verification, and purchase completion.

Logout Test

Verifies successful logout and redirection to the login page.

Logs
The script logs key actions and their statuses to the console, including error messages.

Key Features
Modular Design: Code is organized into separate classes for login, cart, checkout, and logout functionalities.

Dynamic Waits: Includes dynamic waits to ensure elements are interactable before actions are performed.

Error Handling: Captures and logs errors during test execution for debugging.

Environment Configuration: Uses a .env file for configurable parameters such as credentials, product names, and filter options.

Extending the Framework
Add New Test Scenarios: Create new classes and methods for additional scenarios.

Support Other Browsers: Update the CreateDriver function to include browsers like Firefox or Edge.

Data-Driven Testing: Use external files (e.g., CSV or JSON) for test data.

Dependencies
Selenium WebDriver

dotenv

License
This project is licensed under the MIT License.

Author
Keshav Gupta




