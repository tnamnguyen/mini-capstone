// Loading WebDriver test module
const {By, Key, Builder} = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');
const { describe, it } = require('mocha');
const { create } = require("../../server/userModel");
require("chromedriver");

describe('Jobs', function() {
  // Skipping this test as the test below also creates a job and should be representative enough
    it.skip('Creating a job', async function() {
        this.timeout(90000);
        let chromeOptions = new chrome.Options();
        chromeOptions.addArguments("--start-maximized");

        let driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();


        await driver.get("https://mini-capstone.vercel.app");
        await driver.sleep(3000); // timeout for 3 seconds
        

        // Finding and clicking on login button
        let loginButton = await driver.findElement(By.id('log_in_button'))
        await loginButton.click();

        // Filling the fields
        const inputEmail = await driver.findElement(By.xpath('/html/body/div/div/div/div[1]/input[1]'));
        await inputEmail.sendKeys('seleniumR@test.com');
        const inputPassword = await driver.findElement(By.xpath('/html/body/div/div/div/div[1]/input[2]'));
        inputPassword.sendKeys('Qwerty123!');

        loginButton = await driver.findElement(By.id('login_button'))
        loginButton.click();
        
        // Waiting for redirection
        await driver.sleep(8000);

        const jobsButton = await driver.findElement(By.xpath('/html/body/div/nav/div/ul/li[2]/a'));
        jobsButton.click();
        await driver.sleep(2000);
        const createButton = await driver.findElement(By.xpath('/html/body/div/div/div/a[1]'));
        createButton.click();
        await driver.sleep(2000);

        const inputTitle = await driver.findElement(By.xpath('/html/body/div/div/div/form/label[1]/input'));
        inputTitle.sendKeys('Test Selenium Job');
        const inputExperience = await driver.findElement(By.xpath('/html/body/div/div/div/form/label[2]/input'));
        inputExperience.sendKeys('5 years');
        const inputLocation = await driver.findElement(By.xpath('/html/body/div/div/div/form/label[3]/input'));
        inputLocation.sendKeys('NDG');
        const inputDescription = await driver.findElement(By.xpath('/html/body/div/div/div/form/label[4]/textarea'))
        inputDescription.sendKeys('Selenium Test');
        await driver.sleep(1000);

        const submitButton = await driver.findElement(By.xpath('/html/body/div/div/div/form/button'));
        submitButton.click();
        await driver.sleep(35000);
        try {
            const manageButton = await driver.findElement(By.xpath('/html/body/div/div/div/a[2]'));
            manageButton.click();
            await driver.sleep(5000);
            let success = await driver.findElement(By.xpath("//*[contains(text(), 'Test Selenium Job')]"))
            expect(success).to.exist;
            const deleteButton = await driver.findElement(By.xpath('/html/body/div/div/div/div/table/tbody/tr/td[4]/button'));
            deleteButton.click();
          } catch (error) {
            console.error("Error while creating job", error);
            expect.fail("Job wasn't created");
          } finally {
            await driver.sleep(4000);
            await driver.quit();
          }

    })

    it('Create a job and edit the job', async function() {
        this.timeout(90000);
        let chromeOptions = new chrome.Options();
        chromeOptions.addArguments("--start-maximized");

        let driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();

        await driver.get("https://mini-capstone.vercel.app");
        await driver.sleep(3000); // timeout for 3 seconds

        // Finding and clicking on login button
        let loginButton = await driver.findElement(By.id('log_in_button'))
        await loginButton.click();

        // Filling the fields
        const inputEmail = await driver.findElement(By.xpath('/html/body/div/div/div/div[1]/input[1]'));
        await inputEmail.sendKeys('seleniumR@test.com');
        const inputPassword = await driver.findElement(By.xpath('/html/body/div/div/div/div[1]/input[2]'));
        inputPassword.sendKeys('Qwerty123!');

        loginButton = await driver.findElement(By.id('login_button'))
        loginButton.click();
        
        // Waiting for redirection
        await driver.sleep(8000);

        const jobsButton = await driver.findElement(By.xpath('/html/body/div/nav/div/ul/li[2]/a'));
        jobsButton.click();
        await driver.sleep(2000);
        const createButton = await driver.findElement(By.xpath('/html/body/div/div/div/a[1]'));
        createButton.click();
        await driver.sleep(2000);

        let inputTitle = await driver.findElement(By.xpath('/html/body/div/div/div/form/label[1]/input'));
        inputTitle.sendKeys('Old job');
        let inputExperience = await driver.findElement(By.xpath('/html/body/div/div/div/form/label[2]/input'));
        inputExperience.sendKeys('Old Experience');
        let inputLocation = await driver.findElement(By.xpath('/html/body/div/div/div/form/label[3]/input'));
        inputLocation.sendKeys('Old Location');
        let inputDescription = await driver.findElement(By.xpath('/html/body/div/div/div/form/label[4]/textarea'))
        inputDescription.sendKeys('Old description');
        await driver.sleep(1000);
    
        let submitButton = await driver.findElement(By.xpath('/html/body/div/div/div/form/button'));
        submitButton.click();
        await driver.sleep(25000);

        const manageButton = await driver.findElement(By.xpath('/html/body/div/div/div/a[2]'));
        manageButton.click();
        await driver.sleep(5000);

        const editButton = await driver.findElement(By.xpath('/html/body/div/div/div/div/table/tbody/tr/td[2]/a/button'));
        editButton.click();
        await driver.sleep(1000);
        inputTitle = await driver.findElement(By.xpath('/html/body/div/div/div/form/label[1]/input'));
        inputTitle.clear();
        inputTitle.sendKeys('New Job');
        inputExperience = await driver.findElement(By.xpath('/html/body/div/div/div/form/label[2]/input'));
        inputExperience.clear();
        inputExperience.sendKeys('New Experience');
        inputLocation = await driver.findElement(By.xpath('/html/body/div/div/div/form/label[3]/input'));
        inputLocation.clear();
        inputLocation.sendKeys('New Location');
        inputDescription = await driver.findElement(By.xpath('/html/body/div/div/div/form/label[4]/textarea'));
        inputDescription.clear();
        inputDescription.sendKeys('New Description');
        await driver.sleep(1000);

        submitButton = await driver.findElement(By.xpath('/html/body/div/div/div/form/button'));
        submitButton.click();
        await driver.sleep(35000);

        try {
            let success = await driver.findElement(By.xpath("//*[contains(text(), 'New Job')]"));
            expect(success).to.exist;
            const deleteButton = await driver.findElement(By.xpath('/html/body/div/div/div/div/table/tbody/tr/td[4]/button'));
            deleteButton.click();
        } catch (error) {
            console.error("Error while editing job", error);
            expect.fail("Job wasn't created or edited");
          } finally {
            await driver.sleep(5000);
            await driver.quit();
          }
    })

    it("Applying for a job", async function () {
        this.timeout(80000);
    
        let chromeOptions = new chrome.Options();
        chromeOptions.addArguments("--start-maximized");

        let driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
    
        await driver.get("https://mini-capstone.vercel.app");
        // await driver.get("http://localhost:3000/");
        await driver.sleep(5000); // timeout for 3 seconds
    
        // Finding and clicking on login button
        let loginButton = await driver.findElement(By.id("log_in_button"));
        await loginButton.click();
    
        // Filling the fields
        const inputEmail = await driver.findElement(
          By.xpath("/html/body/div/div/div/div[1]/input[1]")
        );
        await inputEmail.sendKeys("selenium@test.com");
        const inputPassword = await driver.findElement(
          By.xpath("/html/body/div/div/div/div[1]/input[2]")
        );
        inputPassword.sendKeys("Qwerty123!");
    
        loginButton = await driver.findElement(By.id("login_button"));
        loginButton.click();
    
        // Waiting for redirection
        await driver.sleep(20000);
    
        jobsButton = await driver.findElement(By.id("job-button"));
        jobsButton.click();
    
        // Waiting for redirection
        await driver.sleep(5000);
    
        applyButton = await driver.findElement(
          By.xpath("/html/body/div/div/div/div/table/tbody/tr[2]/td[5]/button")
        );
        applyButton.click();
    
        // Waiting for redirection
        await driver.sleep(8000);
    
        viewResults = await driver.findElement(By.id("applications-button"));
        viewResults.click();
        
        await driver.sleep(10000);
        try {
          success = await driver.findElement(
            By.xpath("/html/body/div/div/div/div/table/tbody/tr[2]/td[6]/button")
          );
          expect(success).to.exist;
          const removeButton = await driver.findElement(By.xpath('/html/body/div/div/div/div/table/tbody/tr[2]/td[6]/button'));
          removeButton.click();
        } catch (error) {
          console.error("Error while applying for job", error);
          expect.fail("Job couldn't be applied to");
        } finally {
          await driver.sleep(4000);
          await driver.quit();
        }
      });

      it.skip("Saving a job", async function () {
        this.timeout(70000);
    
        let chromeOptions = new chrome.Options();
        chromeOptions.addArguments("--start-maximized");

        let driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
    
        await driver.get("https://mini-capstone.vercel.app");
        // await driver.get("http://localhost:3000/");
        await driver.sleep(5000); // timeout for 3 seconds
    
        // Finding and clicking on login button
        let loginButton = await driver.findElement(By.id("log_in_button"));
        await loginButton.click();
    
        // Filling the fields
        const inputEmail = await driver.findElement(
          By.xpath("/html/body/div/div/div/div[1]/input[1]")
        );
        await inputEmail.sendKeys("selenium@test.com");
        const inputPassword = await driver.findElement(
          By.xpath("/html/body/div/div/div/div[1]/input[2]")
        );
        inputPassword.sendKeys("Qwerty123!");
    
        loginButton = await driver.findElement(By.id("login_button"));
        loginButton.click();
    
        // Waiting for redirection
        await driver.sleep(10000);
    
        jobsButton = await driver.findElement(By.id("job-button"));
        jobsButton.click();
    
        // Waiting for redirection
        await driver.sleep(8000);
    
        saveIt = await driver.findElement(
          By.xpath("/html/body/div/div/div/div/table/tbody/tr[1]/td[6]/button")
        );
        saveIt.click();
    
        await driver.sleep(4000);
    
        savedJobsButton = await driver.findElement(By.xpath("/html/body/div/div/div/a[1]"));
        savedJobsButton.click();
        await driver.sleep(10000);
        try {
          success = await driver.findElement(
            By.xpath("/html/body/div/div/div/div/table/tbody/tr/td[5]/a/button")
          );
          expect(success).to.exist;
          const removeButton = await driver.findElement(By.xpath('/html/body/div/div/div/div/table/tbody/tr/td[6]/button'))
          removeButton.click();
        } catch (error) {
          console.error("Error while saving job", error);
          expect.fail("Job couldn't be saved");
        } finally {
          await driver.sleep(4000);
          await driver.quit();
        }
      });
})