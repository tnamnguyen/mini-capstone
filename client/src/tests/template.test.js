// Loading WebDriver test module
const {By, Key, Builder} = require("selenium-webdriver");
require("chromedriver");

// Declare test function
async function test_case(){
    // Declare driver session as chrome
    let driver = await new Builder().forBrowser("chrome").build();

    // Navigate to website
    await driver.get("https://google.com");

    // Find the element on page with the name 'q' and send to element "Hello, World!", and enter the RETURN key
    await driver.findElement(By.name("q")).sendKeys("Hello, World!", Key.RETURN);

    // Set to quit program after 10 seconds
    setInterval(function(){
        driver.quit();
    }, 10000);
}

// Calling test case
test_case();
