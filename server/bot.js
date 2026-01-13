const { chromium } = require("playwright");
// const { generateFakeEmail } = require("./fakeEmail");

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
    await page.goto(url, { waitUntil: "domcontentloaded" });
    logs.push("Successfully navigated to URL");

    logs.push("Waiting 60 seconds for page to REALLY load");
    await page.waitForTimeout(60000);
    logs.push("Waited 60 seconds");

    logs.push("Attempting to click Next");
    await page.getByRole("button", { name: "Next" }).click();

    logs.push("Next button on page 1 clicked");
    logs.push("Page 1 complete");

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

handleScannedUrl(
  "https://survey.www.marcos.com/survey?qr=NmEvY3FvaTdJemN1dFNtMzFRdnlIWjJBZUFZQUkrV2VESFJnWjRNQWsxVDBvS255T284OTVHNE1NMklMTnRNeVRXL2dseXVqMVl5ZEY0K09KclQ3MlE9PQ=="
);

module.exports = { handleScannedUrl };
