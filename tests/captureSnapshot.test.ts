import { promises as fs } from "fs";
import { chromium, BrowserContext, CDPSession, test } from "@playwright/test";

test("test", async ({ browser, context, page }) => {
  // Creating a new CDP session
  const cdpSession: CDPSession = await context.newCDPSession(page);

  // Enable the necessary domains in the CDP session
  await cdpSession.send("Page.enable");

  // Navigate to a website
  await page.goto("https://www.mabl.com");

  // Use CDP session to get the page title
  const result = await cdpSession.send("Page.captureSnapshot");

  // Write to filesystem
  await fs.writeFile("capturedMabl.mhtml", result.data);
});
