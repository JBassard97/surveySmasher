const { chromium } = require("playwright");
const { generateFakeEmail } = require("./fakeEmail");

async function handleScannedUrl(url) {
  let logs = [];

  try {
    console.log("Received QR URL:", url);
    logs.push("Launching browser");

    const browser = await chromium.launch({
      headless: true,
      slowMo: 150,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    logs.push("Browser successfully launched");

    logs.push("Opening new page");
    const page = await browser.newPage();
    logs.push("Page successfully opened");

    logs.push("Navigating to URL");
    await page.goto(url);
    logs.push("Successfully navigated to URL");

    logs.push("Waiting 60 seconds for page to REALLY load");
    await page.waitForTimeout(60000);
    logs.push("Waited 60 seconds");

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

    await page.locator("label").first().click();
    logs.push("Clicked first option");

    for (let i = 2; i <= 9; i++) {
      logs.push(`Clicking option ${i} (Highly Satisfied)`);
      await page
        .locator(
          `div:nth-child(${i}) > .surv-answ > div > div:nth-child(2) > label`
        )
        .click();
    }

    const tenthHighlySatisfied = page.locator(
      "div:nth-child(10) > .surv-answ > div > div:nth-child(2) > label"
    );

    logs.push("Checking if 10th option exists");

    if (await tenthHighlySatisfied.count()) {
      logs.push("10th option found — clicking it");
      await tenthHighlySatisfied.click();
    } else {
      logs.push("10th option not present — skipping");
    }

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

    logs.push("On page 7");
    await page.getByText("Highly Likely").first().click();
    logs.push("Clicked first Highly Likely");
    await page.getByText("Highly Likely").nth(1).click();
    logs.push("Clicked second Highly Likely");

    logs.push("Clicking Next on page 7");
    await page.getByRole("button", { name: "Next" }).click();
    logs.push("Page 7 complete");

    logs.push("Answering 'Yes', 'Yes', 'Twice' on page 8");
    await page.getByText("Yes").first().click();
    logs.push("Clicked first Yes");
    await page.getByText("Yes").nth(1).click();
    logs.push("Clicked second Yes");
    await page.getByText("Twice").click();
    logs.push("Clicked Twice");

    logs.push("Clicking Next on page 8");
    await page.getByRole("button", { name: "Next" }).click();
    logs.push("Page 8 complete");

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
