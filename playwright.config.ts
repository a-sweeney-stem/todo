import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:3000/",
  },
  projects: [
    {
      name: "page",
      testMatch: /page.spec\.ts/,
    },
    {
      name: "cleanup db",
      testMatch: /global.teardown\.ts/,
    },
  ],
  /* Run your local dev server before starting the tests */
  webServer: {
    command: "pnpm run dev -- -p 3000",
    port: 3000,
  },
});
