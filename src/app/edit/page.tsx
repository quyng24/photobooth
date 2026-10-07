"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Palette,
  Wand2,
  ArrowRight,
  ArrowLeft,
  Type,
} from "lucide-react";
import {
  FILTER_STYLES,
  FRAME_STICKERS,
  FRAME_STYLES,
  getFrameConfig,
  SIGNATURE_COLORS,
  SIGNATURE_FONTS,
  SIGNATURE_STICKERS,
  usePhotoStore,
} from "@/stores/photoStore";
import { renderPhotoStrip } from "@/lib/renderPhotoStrip";
import { formatSignatureLabel } from "@/lib/formatSignatureLabel";
import { Y2kShell } from "@/components/y2k/Y2kShell";
import { Y2kWindow } from "@/components/y2k/Y2kWindow";
import { Y2kSteps } from "@/components/y2k/Y2kSteps";
import { Y2kMarquee } from "@/components/y2k/Y2kMarquee";
import { FilmStripFooter } from "@/components/y2k/FilmStripFooter";

export default function EditPage() {
  const [isExporting, setIsExporting] = useState(false);
  const router = useRouter();
  const {
    photos,
    frameStyle,
    setFrameStyle,
    filterStyle,
    setFilterStyle,
    customText,
    setCustomText,
    signatureFont,
    setSignatureFont,
    signatureColor,
    setSignatureColor,
    signatureSize,
    setSignatureSize,
    stickerId,
    setStickerId,
    stickerPosition,
    setStickerPosition,
    setFinalImage,
  } = usePhotoStore();
  const selectedFilter = FILTER_STYLES[filterStyle];
  const selectedFrame = getFrameConfig(frameStyle);
  const selectedSignatureColor =
    SIGNATURE_COLORS[signatureColor].hex ?? selectedFrame.textHexColor;
  const previewScale = 268 / 800;
  const previewSignatureFontSize = signatureSize * previewScale;
  const selectedSticker = SIGNATURE_STICKERS[stickerId].emoji;
  const signatureLabel = formatSignatureLabel(
    customText,
    selectedSticker,
    stickerPosition,
  );

  const handleExport = async () => {
    try {
      setIsExporting(true);

      const finalImage = await renderPhotoStrip({
        photos,
        frameBg: selectedFrame.background,
        filter: selectedFilter.filter,
        customText,
        signatureColor: selectedSignatureColor,
        signatureFontFamily: SIGNATURE_FONTS[signatureFont].family,
        signatureSize,
        sticker: selectedSticker,
        stickerPosition,
      });

      setFinalImage(finalImage);
      router.push("/result");
    } catch (error) {
      console.error("Export image failed: ", error);
      alert("Không thể xuất ảnh. Vui lòng thử lại");
    } finally {
      setIsExporting(false);
    }
  };

  if (photos.length === 0) {
    return (
      <Y2kShell className="min-h-screen flex items-center justify-center p-6" showStickers>
        <Y2kWindow
          title="EMPTY_STRIP.EXE"
          className="max-w-md w-full"
          bodyClassName="p-8 text-center"
        >
          <p className="font-black text-xl uppercase mb-2">Chưa có ảnh nào</p>
          <p className="text-sm font-bold text-zinc-600 mb-6">
            Booth đang trống — quay lại studio để chụp trước nhé.
          </p>
          <button
            onClick={() => router.push("/")}
            className="w-full bg-cyan-300 border-3 border-black rounded-xl py-3 font-black shadow-[4px_4px_0px_0px_#000]"
          >
            Về trang chủ
          </button>
        </Y2kWindow>
      </Y2kShell>
    );
  }

  return (
    <Y2kShell className="flex flex-col" showStickers>
      <Y2kMarquee
        tone="pink"
        items={["DECOR STUDIO", "PICK A FRAME", "ADD FILTER", "SIGN YOUR STRIP"]}
      />

      <div className="max-w-6xl w-full mx-auto px-3 sm:px-6 py-5 sm:py-8 flex flex-col">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
          <Link
            href="/capture"
            className="inline-flex items-center justify-center gap-1.5 bg-white text-black font-extrabold text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-xl border-2 sm:border-3 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-yellow-300 transition-all"
          >
            <ArrowLeft size={16} />
            STUDIO
          </Link>
          <Y2kSteps current={3} />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <Y2kWindow
            title="DECOR_LAB.EXE"
            className="w-full lg:w-1/2"
            bodyClassName="p-4 sm:p-5 space-y-5 bg-[#fffbe6]"
          >
            <div className="border-b-3 border-black pb-4">
              <h1 className="text-3xl font-black uppercase tracking-tight">Trang Trí</h1>
              <p className="text-sm font-bold text-zinc-600">
                Khung neon, filter film, chữ ký — mix cho tới khi đúng vibe.
              </p>
            </div>

            <div>
              <label className="text-sm font-black uppercase tracking-wider mb-3 flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-600" /> Chọn Màu Khung
              </label>
              <div
                role="group"
                aria-label="Chọn màu khung"
                className="grid grid-cols-2 md:grid-cols-4 gap-3"
              >
                {FRAME_STYLES.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={frameStyle === f.id}
                    onClick={() => setFrameStyle(f.id)}
                    className={`p-3 text-xs font-bold rounded-xl border-2 border-black text-center transition-all ${f.background} ${
                      frameStyle === f.id ? "ring-4 ring-black scale-105" : "hover:scale-105"
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex text-sm font-black uppercase tracking-wider mb-3 items-center gap-2">
                <Wand2 className="w-5 h-5 text-pink-500" /> Chọn Filter
              </label>
              <div
                role="group"
                aria-label="Chọn filter"
                className="flex flex-wrap gap-2"
              >
                {Object.values(FILTER_STYLES).map((ft) => (
                  <button
                    key={ft.id}
                    type="button"
                    aria-pressed={filterStyle === ft.id}
                    onClick={() => setFilterStyle(ft.id)}
                    className={`px-4 py-2 text-xs font-bold rounded-full border-2 border-black transition-all ${
                      filterStyle === ft.id ? "bg-black text-white" : "bg-white hover:bg-zinc-100"
                    }`}
                  >
                    {ft.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-black uppercase tracking-wider mb-2 flex items-center gap-2">
                <Type className="w-5 h-5" /> Chữ Ký Kỷ Niệm
              </label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                maxLength={25}
                className="w-full px-4 py-3 border-2 border-black rounded-xl font-mono text-sm font-bold bg-white outline-none ring-black focus:ring-2"
              />
              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] font-mono font-black">
                  {customText.length}/25
                </span>
              </div>
            </div>

            <fieldset className="space-y-3">
              <legend className="text-sm font-black uppercase tracking-wider">
                Kiểu chữ
              </legend>
              <div
                role="group"
                aria-label="Kiểu chữ chữ ký"
                className="flex flex-wrap gap-2"
              >
                {(["mono", "sans", "serif"] as const).map((id) => {
                  const font = SIGNATURE_FONTS[id];

                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={signatureFont === id}
                      onClick={() => setSignatureFont(id)}
                      className={`rounded-lg border-2 border-black px-4 py-2 text-sm font-bold ${
                        signatureFont === id
                          ? "bg-black text-white"
                          : "bg-white hover:bg-zinc-100"
                      }`}
                    >
                      {font.name}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="space-y-3">
              <legend className="text-sm font-black uppercase tracking-wider">
                Màu chữ ký
              </legend>
              <div
                role="group"
                aria-label="Màu chữ ký"
                className="flex flex-wrap gap-2"
              >
                {(["frame", "pink", "cyan", "yellow", "white"] as const).map(
                  (id) => {
                    const color = SIGNATURE_COLORS[id];
                    const hex = color.hex ?? selectedFrame.textHexColor;

                    return (
                      <button
                        key={id}
                        type="button"
                        aria-label={`Màu chữ ký ${color.name}`}
                        aria-pressed={signatureColor === id}
                        onClick={() => setSignatureColor(id)}
                        className={`h-10 min-w-10 rounded-lg border-2 border-black px-2 text-xs font-bold ${
                          signatureColor === id ? "ring-4 ring-black" : ""
                        }`}
                        style={{
                          backgroundColor: hex,
                          color: hex === "#ffffff" ? "#18181b" : "#ffffff",
                        }}
                      >
                        {color.name}
                      </button>
                    );
                  },
                )}
              </div>
            </fieldset>

            <div className="space-y-2">
              <label
                htmlFor="signature-size"
                className="flex items-center justify-between text-sm font-black uppercase tracking-wider"
              >
                <span>Cỡ chữ ký</span>
                <span>{signatureSize} px</span>
              </label>
              <input
                id="signature-size"
                type="range"
                min={28}
                max={64}
                step={4}
                value={signatureSize}
                onChange={(event) =>
                  setSignatureSize(Number(event.currentTarget.value))
                }
                aria-label="Kích thước chữ ký"
                className="w-full accent-black"
              />
            </div>

            <fieldset className="space-y-3">
              <legend className="text-sm font-black uppercase tracking-wider">
                Sticker trang trí
              </legend>
              <div
                role="group"
                aria-label="Chọn sticker"
                className="flex flex-wrap gap-2"
              >
                {(
                  ["none", "sparkle", "star", "heart", "flower"] as const
                ).map((id) => {
                  const sticker = SIGNATURE_STICKERS[id];

                  return (
                    <button
                      key={id}
                      type="button"
                      aria-label={`Sticker ${sticker.name}`}
                      aria-pressed={stickerId === id}
                      onClick={() => setStickerId(id)}
                      className={`min-h-11 min-w-11 rounded-lg border-2 border-black px-3 py-2 font-bold ${
                        stickerId === id
                          ? "bg-black text-white ring-2 ring-black ring-offset-2"
                          : "bg-white hover:bg-zinc-100"
                      }`}
                    >
                      {sticker.emoji ?? sticker.name}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset
              className="space-y-3"
              disabled={!selectedSticker}
            >
              <legend className="text-sm font-black uppercase tracking-wider">
                Vị trí sticker
              </legend>
              <div
                role="group"
                aria-label="Vị trí sticker"
                className="flex flex-wrap gap-2"
              >
                {(["before", "after", "both"] as const).map((position) => (
                  <button
                    key={position}
                    type="button"
                    aria-pressed={stickerPosition === position}
                    onClick={() => setStickerPosition(position)}
                    className={`rounded-lg border-2 border-black px-4 py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50 ${
                      stickerPosition === position
                        ? "bg-black text-white"
                        : "bg-white hover:bg-zinc-100"
                    }`}
                  >
                    {position === "before"
                      ? "Trước chữ ký"
                      : position === "after"
                        ? "Sau chữ ký"
                        : "Cả 2 đầu"}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="pt-4 border-t-3 border-black">
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="w-full bg-cyan-400 hover:bg-cyan-300 text-black px-6 py-4 rounded-xl font-black text-lg border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isExporting ? "Đang xuất ảnh" : "Hoàn Thành & Xuất Ảnh"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </Y2kWindow>

          <div className="w-full lg:w-1/2 flex flex-col items-center gap-4 lg:sticky lg:top-8">
            <div className="self-stretch flex items-center justify-between text-xs font-bold text-zinc-600">
              <span className="font-black uppercase">Live preview</span>
              <span className="font-mono">
                {photos.length}-CUT
              </span>
            </div>
            <div className="relative">
              <div
                className={`relative p-4 rounded-xl border-4 border-black shadow-[12px_12px_0px_0px_#000] w-75 transition-all ${selectedFrame.background}`}
              >
                <div
                  className="relative mb-3 flex items-center justify-center border-b border-dashed border-black/40"
                  style={{ height: `${70 * previewScale}px` }}
                >
                  {FRAME_STICKERS.map((sticker) => (
                    <span
                      key={`${sticker.emoji}-${sticker.x}`}
                      data-testid="fixed-frame-sticker"
                      aria-hidden="true"
                      className="absolute -translate-x-1/2 -translate-y-1/2 leading-none"
                      style={{
                        left: `${(sticker.x / 800) * 100}%`,
                        top: `${((sticker.y - 40) / 70) * 100}%`,
                        fontSize: `${sticker.fontSize * previewScale}px`,
                      }}
                    >
                      {sticker.emoji}
                    </span>
                  ))}
                  <span
                    className="font-black uppercase tracking-widest"
                    style={{ fontSize: `${24 * previewScale}px` }}
                  >
                    ★ Y2K SNAP ★
                  </span>
                </div>
                <div className="space-y-3">
                  {photos.map((imgSrc, index) => (
                    <div
                      key={index}
                      className="relative aspect-4/3 bg-zinc-200 rounded-lg border-2 border-black overflow-hidden shadow-[2px_2px_0px_0px_#000]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imgSrc}
                        alt={`Snap ${index + 1}`}
                        className={`w-full h-full object-cover ${selectedFilter.className}`}
                      />
                      <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] font-mono px-1 rounded">
                        0{index + 1}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-2 border-t-2 border-dashed border-black/40 text-center">
                  <p
                    data-testid="signature-preview"
                    className={`whitespace-nowrap font-black uppercase ${
                      signatureColor === "frame" ? selectedFrame.textColor : ""
                    }`}
                    style={{
                      color: selectedSignatureColor,
                      fontFamily: SIGNATURE_FONTS[signatureFont].family,
                      fontSize: `${previewSignatureFontSize}px`,
                    }}
                  >
                    {signatureLabel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FilmStripFooter text="DECOR • FILTER • SIGN • EXPORT" />
    </Y2kShell>
  );
}
