const { chromium } = require("playwright");
const { generateFakeEmail } = require("./fakeEmail");

async function handleScannedUrl(url) {
  let logs = [];

  try {
    console.log("Received QR URL:", url);
    logs.push("Launching browser");

    const browser = await chromium.launch({
      headless: true,
      slowMo: 100,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    logs.push("Browser successfully launched");

    logs.push("Opening new page");
    const page = await browser.newPage();
    logs.push("Page successfully opened");

    logs.push("Navigating to URL");
    await page.goto(url, { waitUntil: "domcontentloaded" });
    logs.push("Successfully navigated to URL");

    logs.push("Waiting 50 seconds for page to REALLY load");
    await page.waitForTimeout(50000);
    logs.push("Waited 50 seconds");

    logs.push("Attempting to click Next");
    await page.getByRole("button", { name: "Next" }).click();
    logs.push("Next button on page 1 clicked");
    logs.push("Page 1 complete");

    // ----------------------------------------------------

    logs.push("Selecting 'Highly Satisfied' on page 2");
    await page.getByText("Highly Satisfied").click();
    logs.push("Clicking Next on page 2");
    await page.getByRole("button", { name: "Next" }).click();
    logs.push("Page 2 complete");

    // ----------------------------------------------------

    logs.push("Answering all 'Highly Satisfied' on page 3");

    const questions = page.locator(".surv-answ");
    const count = await questions.count();

    logs.push(`Found ${count} questions on page 3`);

    for (let i = 0; i < count; i++) {
      logs.push(`Clicking Highly Satisfied for question ${i + 1}`);

      const highlySatisfied = questions
        .nth(i)
        .locator("div > div:nth-child(2) > label");

      await highlySatisfied.waitFor({ state: "visible", timeout: 5000 });
      await highlySatisfied.click();
    }

    logs.push("All Highly Satisfied clicked on page 3");

    logs.push("Clicking Next on page 3");
    await page.getByRole("button", { name: "Next" }).click();
    logs.push("Page 3 complete");

    // ----------------------------------------------------

    logs.push("Answering 'Highly Satisfied' on page 4");
    await page.getByText("Highly Satisfied").first().click();
    logs.push("Clicked first Highly Satisfied");
    await page.getByText("Highly Satisfied").nth(1).click();
    logs.push("Clicked second Highly Satisfied");
    await page.getByText("Highly Satisfied").nth(2).click();
    logs.push("Clicked third Highly Satisfied");

    logs.push("Clicking Next on page 4");
    await page.getByRole("button", { name: "Next" }).click();
    logs.push("Page 4 complete");

    // ----------------------------------------------------

    logs.push("On Page 5");

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

    logs.push("Clicking Next on page 5");
    await page.getByRole("button", { name: "Next" }).click();
    logs.push("Page 5 complete");

    logs.push("On page 6");
    await page.getByText("No").click();
    await page.getByRole("button", { name: "Next" }).click();
    logs.push("Page 6 complete");

    // ----------------------------------------------------

    logs.push("On page 7");
    await page.getByText("Highly Likely").first().click();
    logs.push("Clicked first Highly Likely");
    await page.getByText("Highly Likely").nth(1).click();
    logs.push("Clicked second Highly Likely");

    logs.push("Clicking Next on page 7");
    await page.getByRole("button", { name: "Next" }).click();
    logs.push("Page 7 complete");

    // ----------------------------------------------------

    page.waitForTimeout(2000);

    logs.push("On page 8");
    await page.getByText("Yes").click({ force: true });
    logs.push("Clicked Yes");
    // await page.getByText("Yes").nth(1).click();
    // logs.push("Clicked second Yes");
    await page.getByText("Twice").click({ force: true });
    logs.push("Clicked Twice");

    logs.push("Clicking Next on page 8");
    await page.getByRole("button", { name: "Next" }).click();
    logs.push("Page 8 complete");

    // ----------------------------------------------------

    logs.push("Entering email on final page");
    await page.getByRole("textbox").dblclick();
    logs.push("Textbox focused");
    await page.getByRole("textbox").fill(generateFakeEmail());
    logs.push("Fake email filled");

    logs.push("Clicking Finish");
    await page.getByRole("button", { name: "Finish" }).click();
    logs.push("Survey submitted");

    logs.push("Survey successfully smashed");
    console.log("Bot finished automation!");

    await browser.close();
    logs.push("Browser closed");

    return `Success RUN_LOGS:(${logs.join("; ")})`;
  } catch (err) {
    console.error("Bot encountered an error:", err);
    return `Failure ERROR_MESSAGE:(${err.message}) RUN_LOGS:(${logs.join(
      "; "
    )})`;
  }
}

// handleScannedUrl(
//   "https://survey.www.marcos.com/survey?qr=NmEvY3FvaTdJemN1dFNtMzFRdnlIWjJBZUFZQUkrV2VESFJnWjRNQWsxVDBvS255T284OTVHNE1NMklMTnRNeVRXL2dseXVqMVl5ZEY0K09KclQ3MlE9PQ=="
// );

module.exports = { handleScannedUrl };
