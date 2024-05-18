export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BROWSER: "chromium" | "firefox" | "webkit";
      HEADLESS: "true" | "false";
      ENV: "development" | "production" | "test" | "staging";
      MAIN_SITE_URL: string;
    }
  }
}
