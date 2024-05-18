import { After, AfterAll, Before, BeforeAll, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "playwright/test";
import { BrowserManager } from "../helpers/browsers/browserManager";
import { getEnv } from "../../../../env.config";
import { readFileSync } from "fs";

let browser: Browser;
let page: Page;
let context: BrowserContext;

setDefaultTimeout(60 * 1000); // 60 seconds

BeforeAll(async () => {
  getEnv();
  browser = await BrowserManager.getBrowser();
});

// Before({tags: "@login"}, async () => {}); // use this to run the hook only for the scenario tagged with @login
Before({ tags: "not @login" }, async ({ pickle }) => {
  try {
    const scenarioName = pickle.name + pickle.id;
    context = await browser.newContext({
      recordVideo: { dir: "test-results/videos" },
      // storageState: "src/tests/e2e/helpers/storageState.json"; // use this to persist login state; but first save the state in the file.
    });
    await context.tracing.start({
      name: scenarioName,
      title: pickle.name,
      sources: true,
      screenshots: true,
      snapshots: true,
    });
    page = await context.newPage();
  } catch (error) {
    console.log("navigation failed due to: ", error);
    throw new Error(`Failed to navigate to the page ${error}`);
  }

  return page;
});

After(async function ({ pickle, result }) {
  let videoPath: string;
  let img: Buffer;
  const traceFilePath = `./test-results/traces/${pickle.id}.zip`;
  if (result.status === Status.PASSED) {
    img = await page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: "png" });
    videoPath = await page.video().path();
  }
  await context.tracing.stop({ path: traceFilePath });
  await page.close();
  await context.close();
  if (result?.status === Status.PASSED) {
    this.attach(img, "image/png");
    if (videoPath) {
      this.attach(readFileSync(videoPath), "video/mp4");
    }
    const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${traceFilePath}</a>`;
    this.attach(`Trace file: ${traceFileLink}`, "text/html");
  }
});

AfterAll(async () => {
  await browser.close();
});

export { page, browser };

// await page.route("http://localhost:8082/authentication/sign-in", (route) => {
// 1st use
// route.continue({
//   method: "POST",
//   headers: {
//     ...route.request().headers(),
//     "CUSTOM-HEADER": "custom-header-value",
//   },
//   postData: JSON.stringify({
//     email: "email",
//     password: "password",
//   }),
// });
// 2nd use
// route.fulfill({
//   status: 200,
//   contentType: "text/html",
//   body: "mocked response",
// });
// 3rd use
// route.abort();

// });
