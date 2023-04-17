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
  });
});
