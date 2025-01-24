const { Builder, By, until } = require("selenium-webdriver");
require("dotenv").config();
// Create Driver Function
function CreateDriver() {
    return new Builder()
        .forBrowser("chrome")
        .build();
}
function stop(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// LoginPage Class
class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'https://www.saucedemo.com/';
    }

    async navigate() {
        await this.driver.get(this.url);
    }

    async login(username, password) {
        try {
            await this.driver.findElement(By.id('user-name')).sendKeys(username);
            await this.driver.findElement(By.id('password')).sendKeys(password);
            await this.driver.findElement(By.id('login-button')).click();
        } catch (error) {
            console.error('Error During Login', error);
        }
    }

    async getErrorMessage() {
        try {
            const error = await this.driver.findElement(By.css('.error-message-container')).getText();
            return error;
        } catch (e) {
            return null;
        }
    }

    async validateLoginSuccess() {
        await this.driver.wait(until.urlContains('/inventory.html'), 5000);
    }
}

//Task 2 And 3 Adding Items To Cart 
class CartPage {
    constructor(driver) {
        this.driver = driver;
    }

    async navigateToProductDetails(itemName) {  
        const link = await this.driver.wait(  
            until.elementLocated(By.xpath(`//div[text()="${itemName}"]/ancestor::a`)),  
            5000 // Waits for upto 10 Seconds 
        );  
        await link.click();  
    }
    async addItemToCartFromDetails() {  
        const addButton = await this.driver.wait(  
            until.elementLocated(By.id('add-to-cart')),  
            5000 
        );  

        //Makes the code wait until the Button is visible and enabled to
        //Ensure it is clickable and does not get overlapped by any other button
        await this.driver.wait(until.elementIsVisible(addButton), 10000);  
        await this.driver.wait(until.elementIsEnabled(addButton), 10000);  
        await addButton.click();  
    }  

    async addItemToCart(Name) {
        try {
            const Button = await this.driver.findElement(By.xpath
                (`//div[text()='${Name}']/ancestor::div[@class='inventory_item']//button`));
            await this.driver.wait(until.elementIsVisible(Button), 5000);
            await this.driver.wait(until.elementIsEnabled(Button), 5000);
            await this.driver.executeScript("arguments[0].scrollIntoView(true);", Button);
            await Button.click();
        } catch (error) {
            console.error(`Error Adding this Item To Cart: `, error);
        }
    }

    async filterBy(option) {
        const dropdown = await this.driver.findElement(By.className('product_sort_container'));
        await dropdown.sendKeys(option);
    }

    async getCartCount() {
        const CartImg = await this.driver.findElement(By.css('.shopping_cart_badge'));
        return parseInt(await CartImg.getText());
    }

    async navigateToCart() {
        await this.driver.findElement(By.id("shopping_cart_container")).click();
    }
   
    async getItemPrices() {
        const priceElements = await this.driver.findElements(By.css(".inventory_item_price"));
        const prices = [];
        for (const priceElement of priceElements) {
            const priceText = await priceElement.getText();
            const price = parseFloat(priceText.replace("$", ""));
            prices.push(price);
        }
        return prices;
    }
    
    //Remove Items From Cart that cost between certain prices
    async removeItemByPrice(minPrice, maxPrice) {
        const priceElements = await this.driver.findElements(By.css(".inventory_item_price"));
        const removeButtons = await this.driver.findElements(By.css(".cart_button"));
        // Loop to extract price and Remove the items
        for (let i = 0; i < priceElements.length; i++) {
            const priceText = await priceElements[i].getText();
            const price = parseInt(priceText.replace("$", ""));

            if (price >= minPrice && price <= maxPrice) {
                await removeButtons[i].click(); // Remove the item
                return true;
            }
        }

        return false; 
    }

}
// Task 5 Complete The Checkout Flow
class CheckoutPage {
    constructor(driver) {
        this.driver = driver;
    }

    async navigateToCheckout() {
        //Finds And Click on the checkout Button
        const checkoutButton = await this.driver.findElement(By.id("checkout"));
        await checkoutButton.click();
    }

    async fillCheckoutForm(firstName, lastName, zipCode) {
        // Fill the checkout form
        await this.driver.findElement(By.id("first-name")).sendKeys(firstName);
        await this.driver.findElement(By.id("last-name")).sendKeys(lastName);
        await this.driver.findElement(By.id("postal-code")).sendKeys(zipCode);

    }
    async checkout(){
        //Finds And  Click on the Continue button
        const continueButton = await this.driver.findElement(By.id("continue"));
        await continueButton.click();
    }

    async verifyCheckoutOverview() {
        // Make Sure the checkout overview page loads correctly
        const checkoutOverviewHeader = await this.driver.findElement(By.css(".checkout_summary_container"));
        await this.driver.wait(until.elementIsVisible(checkoutOverviewHeader), 5000);

        // Get the total amount element and scroll to it to ensure it's visible
        const totalElement = await this.driver.findElement(By.css(".summary_total_label"));
        await this.scrollToElement(totalElement);

        // Get total amount 
        const totalAmountText = await totalElement.getText();
        const totalAmount = totalAmountText.replace("Total: $", "");
        console.log("Total amount: ",totalAmount);

        return totalAmount;
    }

    async completePurchase() {
        // Scroll to the "Finish" button to ensure it's visible
        const finishButton = await this.driver.findElement(By.id("finish"));
        await this.scrollToElement(finishButton);
        await finishButton.click();

        // Wait for the success message to appear
        const successMessage = await this.driver.findElement(By.css(".complete-header"));
        await this.driver.wait(until.elementIsVisible(successMessage), 5000);
        const message = await successMessage.getText();
        return message;
    }

    // Scroll into view helper function
    async scrollToElement(element) {
        await this.driver.executeScript('arguments[0].scrollIntoView(true);', element);
    }
}

class LogoutPage {
    constructor(driver) {
        this.driver = driver;
    }
    async logout() {
        try {
            //Find and  Click the burger menu icon
            const burgerMenu = await this.driver.findElement(By.id('react-burger-menu-btn'));
            await burgerMenu.click();

            stop(3000);

            // Wait for the logout option to be visible and click it
            const logoutOption = await this.driver.findElement(By.id('logout_sidebar_link'));
            await this.driver.wait(until.elementIsVisible(logoutOption), 5000);
            await logoutOption.click();
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }

    async verifyLogout() {
        // Wait for the login page ('/')to be visible
        await this.driver.wait(until.urlIs('https://www.saucedemo.com/'), 5000);
    }
}


// Main Automation Script
async function main() {
    const driver = CreateDriver();
    try {

        const loginPage = new LoginPage(driver);
        // invalid Login Test
        await loginPage.navigate();
        await loginPage.login(process.env.WRONG_USER, process.env.WRONG_PWD);
        const errorMsg = await loginPage.getErrorMessage();
        console.log('Error Message:', errorMsg);

        await stop(5000);

        // const loginPage = new LoginPage(driver);
        await loginPage.navigate();
        await loginPage.login(process.env.USER_NAME, process.env.USER_PWD);
        await loginPage.validateLoginSuccess();
        console.log('Valid login successful.');

        await stop(5000);
        // Add Items to Cart Test
        const cartPage = new CartPage(driver);
        await cartPage.filterBy(process.env.FILTER_BY);
        await cartPage.addItemToCart(JSON.parse(process.env.PRODUCTS_NAME)[0]);
        await cartPage.addItemToCart(JSON.parse(process.env.PRODUCTS_NAME)[1]);
        const count = await cartPage.getCartCount();

        await stop(5000);
        console.log('Cart item count:', count);

        // Add Item from Product Details Test
        await cartPage.navigateToProductDetails(JSON.parse(process.env.PRODUCTS_NAME)[2]);
        await cartPage.addItemToCartFromDetails();
        const updatedCount = await cartPage.getCartCount();
        console.log('Cart item count (after adding from details):', updatedCount);

        await stop(5000);

        // Remove Items From Cart Ranging Between 8$ And 10$
        try {
            console.log("Navigating to Cart Page...");
            await cartPage.navigateToCart();
    
            // console.log("Fetching item prices...");
    
            // gET prices from cart
            const prices = await cartPage.getItemPrices();
            // console.log("Prices in cart:", prices);
    
            console.log("Removing an item with price between $8 and $10...");
    
            //remove items based on conditions
            const itemRemoved = await cartPage.removeItemByPrice(8, 10);
    
            if (!itemRemoved) {
                throw new Error("No item found in the specified price range ($8 - $10).");
            }
    
            // console.log("Verifying cart item count...");
    
            //GEt items count in cart after removing Items
            const itemCount = await cartPage.getCartCount();
            console.log("Cart count after removal: ",itemCount);
            if (isNaN(itemCount)) {
                throw new Error("Failed to retrieve the cart count after item removal.");
            }
    
            console.log("Test passed: Item removed successfully, and cart count updated.");
        } catch (error) {
            console.error("Error during Remove Item Test:", error.message);
            throw error; // Propagate error to stop execution
        }

        await stop(2000);
        // Automate The CheckOut Flow 
        const checkoutPage = new CheckoutPage(driver);
    try {
        // console.log("Navigating to Checkout Page...");

        await checkoutPage.navigateToCheckout();//call the function to navigate to checkout page

        // console.log("Filling out the checkout form...");

        // call the function to fill the checkout form
        await checkoutPage.fillCheckoutForm(process.env.CUS_FNAME,
           process.env.CUS_SNAME, process.env.CUS_PINCODE);``

        
           await stop(4000);
        // console.log("Verifying checkout overview...");
        await checkoutPage.checkout();
        
        await stop(3000);
        const totalAmount = await checkoutPage.verifyCheckoutOverview();
        console.log("Total amount in checkout overview: ",totalAmount);

        // console.log("Completing the purchase...");

        //Complete the purchase
        const successMessage = await checkoutPage.completePurchase();
        console.log("Purchase completed successfully. Success message:", successMessage);

        //Validate the Success Message
        if (successMessage !=
             process.env.SUCCESS_MSG) {
            throw new Error("Checkout failed, success message not found.");
        }

        console.log("Test passed: Checkout process completed successfully.");
    } catch (error) {
        console.error("Error during Checkout Test:", error.message);
        throw error; // Propagate error to stop execution
    }   

    const logoutPage = new LogoutPage(driver);
    try {
        // Perform logout action
        await logoutPage.logout();
        
        // Verify that the user has been redirected to the login page
        await logoutPage.verifyLogout();
        console.log('Logout was successful and redirected to the login page.');
    } catch (error) {
        console.error('Error during logout test:', error);
    }

    } catch (error) {
        console.error('Error during automation:', error);
    } finally {
        await driver.quit();
    }
}

// Run the Automation
main();
