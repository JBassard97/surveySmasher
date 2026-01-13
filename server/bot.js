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
    await page.goto(url, { waitUntil: "domcontentloaded" });
    logs.push("Successfully navigated to URL");

    logs.push("Locating Next on page 1 (robust)");
    // const next = page.locator("text=Next");
    // await next.waitFor({state: "visible"});
    // await next.click();

    logs.push("Dumping clickable elements...");

    const clickables = await page.evaluate(() => {
      const els = Array.from(
        document.querySelectorAll(
          'button, a, [role="button"], input[type=button], input[type=submit], div, span'
        )
      );
      return els
        .filter((e) => {
          const r = e.getBoundingClientRect();
          return r.width > 0 && r.height > 0;
        })
        .slice(0, 50)
        .map((e) => ({
          tag: e.tagName,
          role: e.getAttribute("role"),
          text: e.innerText?.trim().slice(0, 50),
          aria: e.getAttribute("aria-label"),
          classes: e.className,
        }));
    });

    for (const c of clickables) {
      logs.push(
        `EL: <${c.tag}> role=${c.role} aria=${c.aria} text="${c.text}" class="${c.classes}"`
      );
    }

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

module.exports = { handleScannedUrl };
