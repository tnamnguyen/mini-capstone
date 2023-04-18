const { By, Key, Builder } = require("selenium-webdriver");
const { expect } = require("chai");
const { describe, it } = require("mocha");
require("chromedriver");

describe("Apply For Job test", function () {
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

    applyButton = await driver.findElement(
      By.xpath("/html/body/div/div/div/div/table/tbody/tr[6]/td[5]/button")
    );
    applyButton.click();

    // Waiting for redirection
    await driver.sleep(1000);

    viewResults = await driver.findElement(By.id("applications-button"));
    viewResults.click();

    try {
      success = await driver.findElement(
        By.xpath("/html/body/div/div/div/div/table/tbody/tr/td[1]")
      );
      expect(success).to.exist;
    } catch (error) {
      console.error("Error while applying for job", error);
      expect.fail("Job couldn't be applied to");
    } finally {
      await driver.sleep(4000);
      await driver.quit();
    }
  });
});
