// Loading WebDriver test module
const {By, Key, Builder} = require("selenium-webdriver");
const { expect } = require('chai');
const { describe, it } = require('mocha');
require("chromedriver");

describe('Login', function() {
    it('Logging test user in', async function() {
        this.timeout(20000);
        let driver = await new Builder().forBrowser('chrome').build();

        await driver.get("https://mini-capstone.vercel.app");
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
            await driver.sleep(5000);
            await driver.quit();
        }

    })

    it('Invalid email test', async function() {
        this.timeout(20000);
        let driver = await new Builder().forBrowser('chrome').build();

        await driver.get("https://mini-capstone.vercel.app");
        await driver.sleep(3000); // timeout for 3 seconds

        // Finding and clicking on login button
        let loginButton = await driver.findElement(By.id('log_in_button'))
        await loginButton.click();

        // Filling the fields
        const inputEmail = await driver.findElement(By.xpath('/html/body/div/div/div/div[1]/input[1]'));
        await inputEmail.sendKeys('nonexisting@test.com');
        const inputPassword = await driver.findElement(By.xpath('/html/body/div/div/div/div[1]/input[2]'));
        inputPassword.sendKeys('Qwerty123!');

        loginButton = await driver.findElement(By.id('login_button'))
        loginButton.click();
        await driver.sleep(2000);

        try{
            let success = await driver.findElement(By.xpath('//*[contains(text(), "Invalid email, we don\'t have this email in our database!")]'));
            expect(success).to.exist;
            } catch (error) {
                console.error('Error while logging into account', error);
                expect.fail('Expected Account to not exist');
            } finally {
                await driver.quit();
            }
    })

    it('Invalid password test', async function() {
        this.timeout(20000);
        let driver = await new Builder().forBrowser('chrome').build();

        await driver.get("https://mini-capstone.vercel.app");
        await driver.sleep(3000); // timeout for 3 seconds

        // Finding and clicking on login button
        let loginButton = await driver.findElement(By.id('log_in_button'))
        await loginButton.click();

        // Filling the fields
        const inputEmail = await driver.findElement(By.xpath('/html/body/div/div/div/div[1]/input[1]'));
        await inputEmail.sendKeys('selenium@test.com');
        const inputPassword = await driver.findElement(By.xpath('/html/body/div/div/div/div[1]/input[2]'));
        inputPassword.sendKeys('Azerty123!');

        loginButton = await driver.findElement(By.id('login_button'))
        loginButton.click();
        await driver.sleep(2000);

        try{
            let success = await driver.findElement(By.xpath("//*[contains(text(), 'Invalid password, please try again!')]"));
            expect(success).to.exist;
            } catch (error) {
                console.error('Error while logging into account', error);
                expect.fail('Expected password to be invalid');
            } finally {
                await driver.quit();
            }
    })

})