// Loading WebDriver test module
const {By, Key, Builder} = require("selenium-webdriver");
require("chromedriver");

// Declare test function
async function test_case(){
    // Declare driver session as chrome
    let driver = await new Builder().forBrowser("chrome").build();

    // Navigate to website
    // await driver.get("https://mini-capstone.vercel.app");
    await driver.get("http://localhost:3000");

    //Wait for page to render after 3 minutes
    setTimeout(function() {
        driver.findElement(By.id('header-title'))
        .then(element => {
            console.log('Test passed');
        })
        .catch(error => {
            console.log('Test failed');
        })
        .finally(() => {
                // Set to quit program after 5 seconds
        setInterval(function(){
            driver.quit();
        }, 5000);
        })
    }, 3000)

}

// Calling test case
test_case();
