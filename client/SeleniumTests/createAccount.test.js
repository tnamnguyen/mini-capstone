// Loading WebDriver test module
const {By, Key, Builder} = require("selenium-webdriver");
const { expect } = require('chai');
const { describe, it } = require('mocha');
require("chromedriver");

describe('Creating an account', function() {
    it('Creating an account', async function() {
        this.timeout(10000); // Allow the timeout of the test to be at 10 seconds instead
        let driver = await new Builder().forBrowser('chrome').build();

        // await driver.get("https://mini-capstone.vercel.app");
        await driver.get('http://localhost:3000/');
        await driver.sleep(3000); // timeout for 3 seconds

        // Finding and clicking on login button
        let loginButton = await driver.findElement(By.id('log_in_button'))
        await loginButton.click();
        let createAccountLink = await driver.findElement(By.linkText('Need an account?'));
        await createAccountLink.click();

        // Filling the fields
        const inputName = await driver.findElement(By.css('.signup-container > div:nth-child(2) > input:nth-child(1)'));
        await inputName.sendKeys('Selenium User');
        const inputEmail = await driver.findElement(By.css('.signup-container > div:nth-child(2) > input:nth-child(2)'));
        await inputEmail.sendKeys('selenium@test.com');
        const inputPassword = await driver.findElement(By.xpath('/html/body/div/div/div/div[1]/input[3]'));
        await inputPassword.sendKeys('Qwerty123!');
        const inputConfirmPass = await driver.findElement(By.xpath('/html/body/div/div/div/div[1]/input[4]'));
        await inputConfirmPass.sendKeys('Qwerty123!'); 

        //Click the sign up button
        let signupButton = await driver.findElement(By.id('signup_button'))
        await signupButton.click();

        await driver.sleep(2000);
        try{
        let success = await driver.findElement(By.xpath("//*[contains(text(), 'User succesfully added to database, Redirecting to login page...')]"));
        expect(success).to.exist;
        } catch (error) {
            console.error('Error while creating account: ', error);
            expect.fail('Account already exists');
        } finally {
            await driver.quit();
        }
    })
})