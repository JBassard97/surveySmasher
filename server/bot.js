// bot.js
const { chromium } = require("playwright-core");

module.exports = async function handleScannedUrl(url) {
  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      slowMo: 100,
      executablePath: "/usr/bin/chromium-browser", // system chromium
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    console.log("Navigating to scanned URL...");

    // Attempt to navigate and get the response
    const response = await page.goto(url, { timeout: 10000 }); // 10s timeout
    if (!response || !response.ok()) {
      console.log("Failed to load page or got bad status:", response?.status());
      return "Failure";
    }

    console.log("Page loaded successfully!");
    await browser.close();
    return "Success";
  } catch (err) {
    console.error("Bot encountered an error:", err);
    if (browser) await browser.close();
    return "Failure";
  }
};
