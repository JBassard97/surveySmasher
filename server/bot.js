// bot.js
const { chromium } = require("playwright");

module.exports = async function handleScannedUrl(url) {
  try {
    const browser = await chromium.launch({ headless: true, slowMo: 100 });
    const page = await browser.newPage();

    console.log("Navigating to scanned URL...");
    await page.goto(url);

    console.log("Bot finished automation!");
    await browser.close();

    return "Success"; // everything worked
  } catch (err) {
    console.error("Bot encountered an error:", err);
    return "Failure"; // something went wrong
  }
};
