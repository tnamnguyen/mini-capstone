// Loading WebDriver test module
const {By, Key, Builder} = require("selenium-webdriver");
const { expect } = require('chai');
const { describe, it } = require('mocha');
require("chromedriver");

describe('Render Test', function() {
    it('Home Page rendering', async function() {
        this.timeout(10000);    // Allow the timeout of the test to be at 10 seconds instead
        let driver = await new Builder().forBrowser('chrome').build();

        await driver.get("https://mini-capstone.vercel.app");
        await driver.sleep(3000); // timeout for 3 seconds

        // Asserts
        let header = await driver.findElement(By.className('header-title'));
        let classes = await header.getAttribute('class');
        expect(classes).to.include('header-title');

        // Quit the program
        await driver.quit();
    })
})

