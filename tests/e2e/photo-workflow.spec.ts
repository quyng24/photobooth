import { expect, test } from "@playwright/test";

test("completes a two-photo booth session and starts over", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "canShare", {
      configurable: true,
      value: () => true,
    });
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: async (data: { files?: File[] }) => {
        const file = data.files?.[0];
        localStorage.setItem(
          "shared-photo",
          JSON.stringify({ name: file?.name, type: file?.type }),
        );
      },
    });
  });

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
  const signaturePreview = page.getByTestId("signature-preview");
  await page.getByRole("button", { name: "Serif" }).click();
  await page.getByRole("button", { name: "Màu chữ ký Cyan" }).click();
  await page
    .getByRole("slider", { name: "Kích thước chữ ký" })
    .press("ArrowRight");
  await expect(signaturePreview).toHaveText("TEST PHOTO");
  await expect
    .poll(() =>
      signaturePreview.evaluate((element) => getComputedStyle(element).fontFamily),
    )
    .toContain("Georgia");
  await expect(signaturePreview).toHaveCSS("color", "rgb(8, 51, 68)");
  await expect(signaturePreview).toHaveCSS("font-size", "14.74px");
  const frameStickers = page.getByTestId("fixed-frame-sticker");
  await expect(frameStickers).toHaveCount(2);
  await page.getByRole("button", { name: "Sticker Lấp lánh" }).click();
  await expect(signaturePreview).toHaveText("✨ TEST PHOTO");
  await page.getByRole("button", { name: "Sau chữ ký" }).click();
  await expect(signaturePreview).toHaveText("TEST PHOTO ✨");
  await page.getByRole("button", { name: "Cả 2 đầu" }).click();
  await expect(signaturePreview).toHaveText("✨ TEST PHOTO ✨");
  await page.getByRole("button", { name: /Hoàn Thành & Xuất Ảnh/ }).click();

  await expect(page).toHaveURL(/\/result$/);
  await expect(
    page.getByRole("heading", { name: /Hoàn Tất/ }),
  ).toBeVisible();
  await expect(page.getByRole("img", { name: "Final Photo Booth" })).toHaveAttribute(
    "src",
    /^data:image\/png;base64,/,
  );
  const frameStickerPixels = await page
    .getByRole("img", { name: "Final Photo Booth" })
    .evaluate(async (image) => {
      await (image as HTMLImageElement).decode();
      const canvas = document.createElement("canvas");
      canvas.width = (image as HTMLImageElement).naturalWidth;
      canvas.height = (image as HTMLImageElement).naturalHeight;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas is not available");
      context.drawImage(image as HTMLImageElement, 0, 0);

      return [80, 720].map((x) => {
        const pixels = context.getImageData(x - 18, 57, 36, 36).data;
        let nonBackgroundPixels = 0;
        for (let index = 0; index < pixels.length; index += 4) {
          if (
            pixels[index] !== 103 ||
            pixels[index + 1] !== 232 ||
            pixels[index + 2] !== 249
          ) {
            nonBackgroundPixels++;
          }
        }
        return nonBackgroundPixels;
      });
    });
  expect(frameStickerPixels.every((pixels) => pixels > 0)).toBe(true);

  await page.getByRole("button", { name: "CHIA SẺ NGAY" }).click();
  await expect
    .poll(() =>
      page.evaluate(() => localStorage.getItem("shared-photo")),
    )
    .toContain('"type":"image/png"');

  await page.evaluate(() => {
    Object.defineProperty(navigator, "canShare", {
      configurable: true,
      value: () => false,
    });
  });
  await page.getByRole("button", { name: "CHIA SẺ NGAY" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Trình duyệt không hỗ trợ chia sẻ tệp",
  );
  const fallbackDownloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "TẢI ẢNH THAY THẾ" }).click();
  const fallbackDownload = await fallbackDownloadPromise;
  expect(fallbackDownload.suggestedFilename()).toMatch(/^photobooth-.*\.png$/);

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
