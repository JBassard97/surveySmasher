const { chromium } = require("playwright");
const { generateFakeEmail } = require("./fakeEmail");

async function handleScannedUrl(url) {
  try {
    console.log("Received QR URL:", url);

    const browser = await chromium.launch({
      headless: false,
      slowMo: 50,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    console.log("On 1st page...");
    await page.goto(url, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Next" }).click();

    console.log("On 2nd page...");
    await page.getByText("Highly Satisfied").click();
    await page.getByRole("button", { name: "Next" }).click();

    console.log("on 3rd page...");
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
    const tenthHighlySatisfied = page.locator(
      "div:nth-child(10) > .surv-answ > div > div:nth-child(2) > label"
    );
    if ((await tenthHighlySatisfied.count()) > 0) {
      console.log("Tenth 'Highly Satisfied' found, clicking it...");
      await tenthHighlySatisfied.click();
    }
    await page.getByRole("button", { name: "Next" }).click();

    console.log("On 4th page...");
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
    await browser.close();
    console.error("Bot encountered an error:", err);
    return `Failure (${err.message})`;
  }
}

handleScannedUrl(
  "https://survey.order.marcos.com/survey?id=T2R6dVBGT3I5SHBWZ2tOL0dWem1HUT09%22"
);

module.exports = { handleScannedUrl };
