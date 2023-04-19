// Loading WebDriver test module
const {By, Key, Builder} = require("selenium-webdriver");
const { expect } = require('chai');
const { describe, it } = require('mocha');
require("chromedriver");

describe('Connection', function() {
    it('Requesting a connection from admin', async function() {
        this.timeout(50000);
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

        // Click on connections Button 
        let connectionsButton = await driver.findElement(By.css('#navbarSupportedContent > ul > li:nth-child(1) > a'))
        connectionsButton.click();
        await driver.sleep(5000);

        // Click on add connection button
        const addButton = await driver.findElement(By.xpath('/html/body/div/div[2]/a[1]'))
        addButton.click();
        await driver.sleep(5000);

        // Search for admin and add admin
        const searchUser = await driver.findElement(By.xpath('/html/body/div/div/div/form/label/input'))
        await searchUser.sendKeys('admin');
        await driver.sleep(2000);
        const addAdmin = await driver.findElement(By.xpath('/html/body/div/div/div/form/div/table/tbody/tr[1]/td[2]/button'));
        addAdmin.click();
        await driver.sleep(3000);
        try{
            // TODO once possible, verify that the connection can be viewed from sent connection and then delete the request
            // connectionsButton.click();
            // const sentButton = await driver.findElement(By.xpath('/html/body/div/div[2]/a[3]'));
            // sentButton.click();
            // let success = await driver.findElement(By.xpath("//*[contains(text(), 'admin')]"));
            // expect(success).to.exist;

            // Currently, it will suffice that we verify whether we are confirmed that the connections were added or not
            let success = await driver.findElement(By.xpath("//*[contains(text(), 'Connections Added successfully')]"));
            expect(success).to.exist;

            // This block is to be removed
            connectionsButton = await driver.findElement(By.css('#navbarSupportedContent > ul > li:nth-child(1) > a'))
            connectionsButton.click();
            await driver.sleep(2000);
            const sentButton = await driver.findElement(By.xpath('/html/body/div/div[2]/a[3]'));
            sentButton.click();
            await driver.sleep(3000);
            const unsendButton = await driver.findElement(By.xpath('/html/body/div/div[1]/table/tbody/tr/td[3]/button'))
            unsendButton.click();

            } catch (error) {
                console.error('Error while adding a connection: ', error);
                expect.fail('Connection was not added successfully.');
            } finally {
                await driver.sleep(2000);
                await driver.quit();
            }



    })
})