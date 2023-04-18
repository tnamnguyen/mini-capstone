// Loading WebDriver test module
const {By, Key, Builder} = require("selenium-webdriver");
const { expect } = require('chai');
const { describe, it } = require('mocha');
require("chromedriver");

describe('Profile', function() {
    it('Editing Profile', async function() {
        this.timeout(35000);
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
        await driver.sleep(8000);

        // Navigate to edit profile
        const profileButton = await driver.findElement(By.xpath('/html/body/div/nav/div/ul/li[5]/a'));
        profileButton.click();
        await driver.sleep(3000);
        const editButton = await driver.findElement(By.xpath('//*[@id="profile_edit_profile_button"]'));
        editButton.click();
        await driver.sleep(3000);

        // Modify username value
        const userNameButton = await driver.findElement(By.xpath('/html/body/div/div/div[2]/div[1]/button/img'));
        userNameButton.click();
        await driver.sleep(2000);
        const userName = await driver.findElement(By.xpath('/html/body/div/div/div[2]/div[1]/form/input'));
        await driver.sleep(2000);
        if (await userName.getAttribute("value") === 'Selenium User'){
            await userName.clear();
            await userName.sendKeys('Selenium Tester')
        }
        else {
            await userName.clear();
            await userName.sendKeys('Selenium User')
        }
        const updateUserName = await driver.findElement(By.xpath('//*[@id="edit_profile_update_button"]'))
        updateUserName.click();
        await driver.sleep(2000);
        try {
            const submitButton = await driver.findElement(By.id('edit_profile_submit_button'));
            submitButton.click();
            await driver.sleep(2000);
            const success = await driver.findElement(By.xpath("//*[contains(text(), 'Successfully edited profile!')]"))
            expect(success).to.exist;
        } catch (error) {
            console.error('Error while editing profile: ', error);
            expect.fail('Edit Profile error');
        } finally {
            await driver.sleep(2000);
            await driver.quit();
        }

    })
})