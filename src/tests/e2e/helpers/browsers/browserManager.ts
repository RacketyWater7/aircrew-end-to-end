import { Browser, LaunchOptions, chromium, firefox, webkit } from "playwright";

export class BrowserManager {
  private static browser: Browser | null = null;

  public static async getBrowser(): Promise<Browser> {
    if (!this.browser) {
      const browserType = process.env.npm_config_BROWSER || "chromium"; // when making test cmd --BROWSER=chromium
      const headless = process.env.HEADLESS === "true";
      const launchOptions: LaunchOptions = {
        headless,
        slowMo: headless ? 0 : 50,
      };

      switch (browserType) {
        case "chromium":
          this.browser = await chromium.launch(launchOptions);
          break;
        case "firefox":
          this.browser = await firefox.launch(launchOptions);
          break;
        case "webkit":
          this.browser = await webkit.launch(launchOptions);
          break;
        default:
          throw new Error(`Unknown browser: ${browserType}`);
      }
    }

    return this.browser;
  }
}
