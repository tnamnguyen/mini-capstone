const { By, Key, Builder } = require("selenium-webdriver");
const { expect } = require("chai");
const { describe, it } = require("mocha");
require("chromedriver");

describe("Create Job test", function () {
  it("Logging test user in", async function () {
    this.timeout(10000);

    let driver = await new Builder().forBrowser("chrome").build();

    // await driver.get("https://mini-capstone.vercel.app");
    await driver.get("http://localhost:3000/");
    await driver.sleep(3000); // timeout for 3 seconds

    // Finding and clicking on login button
    let loginButton = await driver.findElement(By.id("log_in_button"));
    await loginButton.click();

    // Filling the fields
    const inputEmail = await driver.findElement(
      By.xpath("/html/body/div/div/div/div[1]/input[1]")
    );
    await inputEmail.sendKeys("seleniumR@test.com");
    const inputPassword = await driver.findElement(
      By.xpath("/html/body/div/div/div/div[1]/input[2]")
    );
    inputPassword.sendKeys("Qwerty123!");

    loginButton = await driver.findElement(By.id("login_button"));
    loginButton.click();

    // Waiting for redirection
    await driver.sleep(4000);

    jobsButton = await driver.findElement(By.id("job-button"));
    jobsButton.click();

    // Waiting for redirection
    await driver.sleep(1000);

    toCreateButton = await driver.findElement(By.id("create-button"));
    toCreateButton.click();

    // Waiting for redirection
    await driver.sleep(1000);

    const inputA = await driver.findElement(By.id("inputA"));
    await inputA.sendKeys("SeleniumTest Job");

    const inputB = await driver.findElement(By.id("inputB"));
    await inputB.sendKeys("None");

    const inputC = await driver.findElement(By.id("inputC"));
    await inputC.sendKeys("Laval");

    const inputD = await driver.findElement(By.id("inputD"));
    await inputD.sendKeys("SeleniumTest Job boy howdy this works");

    submitButton = await driver.findElement(
      By.xpath("/html/body/div/div/div/form/button")
    );
    submitButton.click();

    await driver.sleep(4000);
    try {
      let success = await driver.findElement(By.xpath(""));
      expect(success).to.exist;
    } catch (error) {
      console.error("Error while creating job", error);
      expect.fail("Job couldn't be created");
    } finally {
      await driver.sleep(4000);
      await driver.quit();
    }
  });
});
