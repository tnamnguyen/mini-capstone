// Loading WebDriver test module
const {By, Key, Builder} = require("selenium-webdriver");
const { expect } = require('chai');
const { describe, it } = require('mocha');
require("chromedriver");

describe('Login test', function() {
    it('Logging test user in', async function() {
        this.timeout(10000);
        let driver = await new Builder().forBrowser('chrome').build();

        // await driver.get("https://mini-capstone.vercel.app");
        await driver.get('http://localhost:3000/');
        await driver.sleep(3000); // timeout for 3 seconds

        // Finding and clicking on login button
        let loginButton = await driver.findElement(By.id('log_in_button'))
        await loginButton.click();

        // Filling the fields
        const inputEmail = await driver.findElement(By.xpath('/html/body/div/div/div/div[1]/input[1]'));
        await inputEmail.sendKeys('selenium@test.com');
        const inputPassword = await driver.findElement(By.xpath('/html/body/div/div/div/div[1]/input[2]'));
        inputPassword.sendKeys('Qwerty123!');

        loginButton = await driver.findElement(By.id('login_button'))
        loginButton.click();
        
        // Waiting for redirection
        await driver.sleep(5000);
        try {
            let logout = await driver.findElement(By.xpath('/html/body/div/nav/div/ul/li[7]/a'));
            expect(logout).to.exist;
            await logout.click();
        } catch (error) {
            console.error('Logout not found', error);
            expect.fail('User was not logged in correctly');
        } finally {
            await driver.quit();
        }

    })
})