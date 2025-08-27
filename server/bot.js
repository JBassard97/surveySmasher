const { chromium } = require("playwright");

module.exports = async function handleScannedUrl(url) {
  try {
    console.log("Received QR URL:", url);

    const browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle" });

    console.log("Bot finished automation!");
    await browser.close();
    return "Success";
  } catch (err) {
    console.error("Bot encountered an error:", err);
    return "Failure";
  }
};
