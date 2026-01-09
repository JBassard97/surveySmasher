const { chromium } = require("playwright");
const { generateFakeEmail } = require("./fakeEmail");

async function handleScannedUrl(url) {
  try {
    console.log("Received QR URL:", url);

    const browser = await chromium.launch({
      headless: true,
      slowMo: 100,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle" });

    await page.getByRole("button", { name: "Next" }).click();
    await page.getByText("Highly Satisfied").click();
    await page.getByRole("button", { name: "Next" }).click();
    await page.locator("label").first().click();
    await page
      .locator("div:nth-child(2) > .surv-answ > div > div:nth-child(2) > label")
      .click();
    await page
      .locator("div:nth-child(3) > .surv-answ > div > div:nth-child(2) > label")
      .click();
    await page
      .locator("div:nth-child(4) > .surv-answ > div > div:nth-child(2) > label")
      .click();
    await page
      .locator("div:nth-child(5) > .surv-answ > div > div:nth-child(2) > label")
      .click();
    await page
      .locator("div:nth-child(6) > .surv-answ > div > div:nth-child(2) > label")
      .click();
    await page
      .locator("div:nth-child(7) > .surv-answ > div > div:nth-child(2) > label")
      .click();
    await page
      .locator("div:nth-child(8) > .surv-answ > div > div:nth-child(2) > label")
      .click();
    await page
      .locator("div:nth-child(9) > .surv-answ > div > div:nth-child(2) > label")
      .click();
    await page
      .locator(
        "div:nth-child(10) > .surv-answ > div > div:nth-child(2) > label"
      )
      .click();
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByText("Highly Satisfied").first().click();
    await page.getByText("Highly Satisfied").nth(1).click();
    await page.getByText("Highly Satisfied").nth(2).click();
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByText("No").click();
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByText("Highly Likely").first().click();
    await page.getByText("Highly Likely").nth(1).click();
    await page.getByRole("button", { name: "Next" }).click();

    await page.getByText("Yes").first().click();
    await page.getByText("Yes").nth(1).click();
    await page.getByText("Twice").click();
    await page.getByRole("button", { name: "Next" }).click();

    await page.getByRole("textbox").dblclick();
    await page.getByRole("textbox").fill(generateFakeEmail());
    await page.getByRole("button", { name: "Finish" }).click();

    console.log("Bot finished automation!");
    await browser.close();
    return "Success";
  } catch (err) {
    console.error("Bot encountered an error:", err);
    return "Failure";
  }
}

// handleScannedUrl(
//   "https://survey.order.marcos.com/survey?id=TzZKd0VGOFJodFJaUW9VdWhRclczZz09&src=2"
// );

module.exports = { handleScannedUrl };
