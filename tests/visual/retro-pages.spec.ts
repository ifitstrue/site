import { expect, test, type Page } from "@playwright/test";

async function settlePage(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({
    content: `
      *, *::before, *::after { caret-color: transparent !important; }
      nextjs-portal { display: none !important; }
    `,
  });
}

for (const { name, path } of [
  { name: "homepage", path: "/" },
  { name: "about", path: "/about" },
  { name: "resume", path: "/resume" },
]) {
  test(`${name} matches its approved layout`, async ({ page }) => {
    await page.goto(path);
    await settlePage(page);

    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true });
  });
}

test("identity Easter Egg dialog matches its approved layout", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "The Easter Egg is desktop-only by design.");

  await page.goto("/");
  await settlePage(page);

  for (const [word, destination] of [
    ["engineer", "projects"],
    ["baker", "recipes"],
    ["candlemaker", "candles"],
  ] as const) {
    const wordBox = await page.getByTestId(`identity-word-${word}`).boundingBox();
    const targetBox = await page.locator(`[data-destination="${destination}"]`).boundingBox();
    if (!wordBox || !targetBox) throw new Error(`Could not locate ${word} or ${destination}.`);

    await page.mouse.move(wordBox.x + wordBox.width / 2, wordBox.y + wordBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2);
    await page.mouse.up();
  }

  await expect(page.getByRole("alertdialog", { name: "Identity Update" })).toBeVisible({
    timeout: 3_000,
  });
  await expect(page).toHaveScreenshot("identity-dialog.png", { fullPage: true });
});
