import { expect, test } from "@playwright/test";

test("completes a two-photo booth session and starts over", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /VÀO BUỒNG CHỤP NGAY/i }).click();

  await expect(page).toHaveURL(/\/setup$/);
  await page.getByRole("button", { name: /2 CUT/ }).click();
  await page.getByRole("button", { name: /TIẾP TỤC CHỤP/ }).click();

  await expect(page).toHaveURL(/\/capture\?mode=2cut$/);
  await expect(page.getByText("READY", { exact: true })).toBeVisible({
    timeout: 15_000,
  });
  await page.getByRole("button", { name: "Chụp ảnh" }).click();
  await expect(page.getByRole("img", { name: "Photo 1" })).toBeVisible({
    timeout: 15_000,
  });
  await expect(page.getByRole("img", { name: "Photo 2" })).toBeVisible({
    timeout: 15_000,
  });

  await page
    .getByRole("button", { name: /HOÀN THÀNH → CHỈNH SỬA/ })
    .click();
  await expect(page).toHaveURL(/\/edit$/);

  await page.getByRole("button", { name: "Cyber Cyan" }).click();
  await page.getByRole("button", { name: "B&W Film" }).click();
  await page.getByRole("textbox").fill("TEST PHOTO");
  await page.getByRole("button", { name: /Hoàn Thành & Xuất Ảnh/ }).click();

  await expect(page).toHaveURL(/\/result$/);
  await expect(
    page.getByRole("heading", { name: /Hoàn Tất/ }),
  ).toBeVisible();
  await expect(page.getByRole("img", { name: "Final Photo Booth" })).toHaveAttribute(
    "src",
    /^data:image\/png;base64,/,
  );

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: /TẢI ẢNH VỀ MÁY/ }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/^photobooth-.*\.png$/);

  await page.getByRole("link", { name: /CHỤP LẠI TỪ ĐẦU/ }).click();
  await expect(page).toHaveURL("/");
  await page.getByRole("link", { name: /VÀO BUỒNG CHỤP NGAY/i }).click();
  await expect(page.getByRole("button", { name: /4 CUT/ })).toHaveClass(
    /bg-pink-400/,
  );
});
