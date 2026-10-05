import { expect, test } from "@playwright/test";

test("completes a two-photo booth session and starts over", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /VÀO BUỒNG CHỤP NGAY/i }).click();

  await expect(page).toHaveURL(/\/setup$/);
  await page.getByRole("button", { name: /2 CUT/ }).click();
  await expect(page.getByRole("button", { name: /2 CUT/ })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.getByRole("button", { name: "Cyber Cyan" }).click();
  await page.getByRole("button", { name: "5 giây" }).click();
  await expect(page.getByRole("button", { name: "5 giây" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.getByRole("button", { name: /TIẾP TỤC CHỤP/ }).click();

  await expect(page).toHaveURL(/\/capture\?mode=2cut$/);
  await expect(
    page.getByLabel("Frame đã chọn: Cyber Cyan"),
  ).toBeVisible();
  await expect(page.getByText("READY", { exact: true })).toBeVisible({
    timeout: 15_000,
  });
  await page.getByRole("button", { name: "Chụp ảnh" }).click();
  await expect(page.getByRole("status").filter({ hasText: "5" })).toBeVisible();
  const capturedPhoto = page.getByRole("img", { name: "Photo 1" });
  await expect(capturedPhoto).toBeVisible({
    timeout: 15_000,
  });
  const originalPhotoSrc = await capturedPhoto.getAttribute("src");
  expect(originalPhotoSrc).toBeTruthy();
  await expect(page.getByRole("img", { name: "Photo 2" })).toBeVisible({
    timeout: 15_000,
  });

  await page
    .getByRole("button", { name: /HOÀN THÀNH → CHỈNH SỬA/ })
    .click();
  await expect(page).toHaveURL(/\/edit$/);

  const previewPhoto = page.getByRole("img", { name: "Snap 1" });
  await expect(previewPhoto).toHaveAttribute("src", originalPhotoSrc!);
  await expect(previewPhoto).toHaveClass(/filter-none/);
  await expect(previewPhoto).toHaveCSS("filter", "none");

  await page.getByRole("button", { name: "Cyber Cyan" }).click();
  await page.getByRole("button", { name: "B&W Film" }).click();
  await expect(page.getByRole("button", { name: "B&W Film" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(previewPhoto).toHaveAttribute("src", originalPhotoSrc!);
  await expect(previewPhoto).toHaveClass(/filter-bw/);
  await expect(previewPhoto).toHaveCSS("filter", "grayscale(1) contrast(1.2)");
  await page.getByRole("button", { name: "Pop Punch" }).click();
  await expect(previewPhoto).toHaveAttribute("src", originalPhotoSrc!);
  await expect(previewPhoto).toHaveClass(/filter-pop/);
  await expect(previewPhoto).toHaveCSS(
    "filter",
    "saturate(1.45) contrast(1.15) hue-rotate(8deg)",
  );
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

test("captures four photos, retakes one, and keeps the setup responsive", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("link", { name: /VÀO BUỒNG CHỤP NGAY/i }).click();

  await expect(page).toHaveURL(/\/setup$/);
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    )
    .toBe(true);
  await page.getByRole("button", { name: /4 CUT/ }).click();
  await page.getByRole("button", { name: /TIẾP TỤC CHỤP/ }).click();

  await expect(page).toHaveURL(/\/capture\?mode=4cut$/);
  await expect(page.getByText("READY", { exact: true })).toBeVisible({
    timeout: 15_000,
  });
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    )
    .toBe(true);

  await page.getByRole("button", { name: "Chụp ảnh" }).click();
  for (let photoNumber = 1; photoNumber <= 4; photoNumber += 1) {
    await expect(
      page.getByRole("img", { name: `Photo ${photoNumber}` }),
    ).toBeVisible({ timeout: 15_000 });
  }

  await page.getByRole("button", { name: "RETAKE" }).first().click();
  await expect(page.getByText("Đang chụp lại ảnh #1...")).toBeVisible();
  await expect(page.getByRole("button", { name: "RETAKE" }).first()).toBeVisible({
    timeout: 15_000,
  });
  await expect(page.getByRole("img", { name: /^Photo / })).toHaveCount(4);

  await page
    .getByRole("button", { name: /HOÀN THÀNH → CHỈNH SỬA/ })
    .click();
  await expect(page).toHaveURL(/\/edit$/);
  await expect(page.getByRole("img", { name: /^Snap / })).toHaveCount(4);
});

test("uses mock camera after a camera permission denial", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator.mediaDevices, "getUserMedia", {
      configurable: true,
      value: () =>
        Promise.reject(
          new DOMException("Camera permission denied", "NotAllowedError"),
        ),
    });
  });

  await page.goto("/");
  await page.getByRole("link", { name: /VÀO BUỒNG CHỤP NGAY/i }).click();
  await page.getByRole("button", { name: /2 CUT/ }).click();
  await page.getByRole("button", { name: /TIẾP TỤC CHỤP/ }).click();

  await expect(page.getByText("Cần cấp quyền Camera")).toBeVisible({
    timeout: 15_000,
  });
  await page.getByRole("button", { name: "DÙNG MOCK" }).click();
  await expect(page.getByText("MOCK", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: "Chụp ảnh" }).click();
  await expect(page.getByRole("img", { name: "Photo 1" })).toBeVisible({
    timeout: 15_000,
  });
  await expect(page.getByRole("img", { name: "Photo 2" })).toBeVisible({
    timeout: 15_000,
  });
});
