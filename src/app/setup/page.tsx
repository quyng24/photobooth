"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Sparkles,
  Check,
  ArrowLeft,
  Timer,
  Sun,
  UserCheck,
  RefreshCw,
  Info,
} from "lucide-react";
import { usePhotoStore } from "@/stores/photoStore";
import { FRAME_TEMPLATES, getFrame } from "@/frames/registry";
import type { TimerOption } from "@/types";
import { Y2kShell } from "@/components/y2k/Y2kShell";
import { Y2kWindow } from "@/components/y2k/Y2kWindow";
import { Y2kSteps } from "@/components/y2k/Y2kSteps";
import { Y2kMarquee } from "@/components/y2k/Y2kMarquee";
import { FilmStripFooter } from "@/components/y2k/FilmStripFooter";

const TIMER_OPTIONS: { value: TimerOption; label: string; desc: string }[] = [
  { value: 3, label: "3 GIÂY", desc: "Nhanh gọn" },
  { value: 5, label: "5 GIÂY", desc: "Tiêu chuẩn" },
  { value: 10, label: "10 GIÂY", desc: "Thong thả" },
];

function SetupContent() {
  const searchParams = useSearchParams();
  const { setCutMode, frameStyle, setFrameStyle, timer, setTimer } =
    usePhotoStore();

  // Nhận diện param ?frame=... từ trang chủ nếu có
  useEffect(() => {
    const frameParam = searchParams.get("frame");
    if (frameParam && FRAME_TEMPLATES.some((f) => f.id === frameParam)) {
      setFrameStyle(frameParam);
      const selected = getFrame(frameParam);
      setCutMode(`${selected.cutCount}cut`);
    }
  }, [searchParams, setFrameStyle, setCutMode]);

  const currentFrame = getFrame(frameStyle);

  const handleSelectFrame = (id: string) => {
    setFrameStyle(id);
    const selected = getFrame(id);
    setCutMode(`${selected.cutCount}cut`);
  };

  const SelectedPreviewComponent = currentFrame.Component;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 sm:px-6 lg:px-8 pb-12 pt-2">
      {/* NAVBAR */}
      <div className="flex w-full items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border-3 border-black bg-white px-3.5 py-2 text-xs font-black shadow-[3px_3px_0px_0px_#000] hover:bg-yellow-300 hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all"
        >
          <ArrowLeft size={16} />
          TRANG CHỦ
        </Link>
        <Y2kSteps current={1} />
      </div>

      {/* HEADER TITLE */}
      <div className="flex flex-col items-center justify-center text-center mt-2 mb-2">
        <div className="inline-flex items-center gap-2 bg-yellow-300 border-2 border-black px-3 py-1 rounded-full text-xs font-black uppercase shadow-[2px_2px_0px_#000] mb-2 -rotate-1">
          <Sparkles className="w-3.5 h-3.5 text-pink-600 fill-pink-600" />
          BƯỚC 1: THIẾT LẬP PHÒNG CHỤP
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black drop-shadow-[2px_2px_0px_#22d3ee]">
          Chọn Khung & Thời Gian
        </h1>
        <p className="text-xs sm:text-sm font-bold text-zinc-600 max-w-md mt-1">
          Chọn 1 trong 4 mẫu khung ảnh độc quyền và đặt thời gian đếm ngược phù
          hợp với bạn
        </p>
      </div>

      {/* MAIN 2-COLUMN BALANCED LAYOUT */}
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 items-start">
        {/* CỘT TRÁI: CHỌN KHUNG & CÀI ĐẶT (7 COLS TRÊN DESKTOP) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <Y2kWindow
            title="C:\\FRAME_SELECT.EXE"
            className="w-full"
            bodyClassName="flex flex-col bg-[#fffbe6] p-5 sm:p-6"
          >
            {/* 1. MẪU KHUNG ẢNH */}
            <section
              aria-labelledby="frame-templates-heading"
              className="w-full mb-6"
            >
              <div className="flex items-center justify-between mb-3.5">
                <h2
                  id="frame-templates-heading"
                  className="text-sm sm:text-base font-black uppercase tracking-wide flex items-center gap-2 text-black"
                >
                  <span>
                    🎨 1. Chọn Mẫu Khung Ảnh ({FRAME_TEMPLATES.length} Mẫu)
                  </span>
                </h2>
                <span className="text-[10px] font-mono font-bold bg-black text-yellow-300 px-2 py-0.5 rounded border border-black shadow-xs">
                  HD 2X READY
                </span>
              </div>

              {/* Lưới 4 Khung Ảnh (2x2 Cân Đối Cực Đẹp) */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {FRAME_TEMPLATES.map((frame) => {
                  const isSelected = frameStyle === frame.id;
                  return (
                    <button
                      key={frame.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => handleSelectFrame(frame.id)}
                      className={`relative flex flex-col rounded-2xl border-3 border-black p-3 text-left transition-all cursor-pointer ${
                        frame.theme.bgPreview
                      } ${
                        isSelected
                          ? "ring-4 ring-black shadow-[6px_6px_0px_0px_#000] -translate-y-1 scale-101"
                          : "opacity-90 shadow-[3px_3px_0px_0px_#000] hover:opacity-100 hover:shadow-[5px_5px_0px_0px_#000] hover:-translate-y-0.5"
                      }`}
                    >
                      {/* Thẻ Header Khung: Số ô & Tag */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-black text-white font-mono text-[9px] font-black px-1.5 py-0.5 rounded">
                          {frame.cutCount} Ô
                        </span>
                        {frame.id === "tet-holiday" ? (
                          <span className="font-mono text-[9px] font-black bg-red-600 text-yellow-300 px-1.5 py-0.5 rounded border border-black">
                            MỚI
                          </span>
                        ) : frame.id === "taekwondo-panda" ? (
                          <span className="font-mono text-[9px] font-black bg-blue-600 text-white px-1.5 py-0.5 rounded">
                            HOT
                          </span>
                        ) : (
                          <span className="font-mono text-[9px] font-bold text-zinc-600">
                            CLASSIC
                          </span>
                        )}
                      </div>

                      {/* Thumbnail Preview */}
                      <div className="relative w-full aspect-4/5 rounded-xl border-2 border-black bg-white overflow-hidden mb-2.5 flex items-center justify-center shadow-inner">
                        {frame.previewImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={frame.previewImage}
                            alt={frame.name}
                            className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center text-xs font-black">
                            {frame.name}
                          </div>
                        )}
                      </div>

                      {/* Tên khung & Mô tả */}
                      <div className="flex flex-col">
                        <span className="font-black text-xs sm:text-sm uppercase truncate text-black">
                          {frame.name}
                        </span>
                        <span className="text-[10px] font-bold text-zinc-600 truncate mt-0.5">
                          {frame.theme.badgeText}
                        </span>
                      </div>

                      {/* Checkmark khi chọn */}
                      {isSelected && (
                        <div className="absolute -top-2.5 -right-2.5 rounded-full border-2 border-black bg-yellow-300 p-1 text-black shadow-[2px_2px_0px_0px_#000] z-10 animate-bounce">
                          <Check size={16} strokeWidth={4} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 2. THỜI GIAN ĐẾM NGƯỢC */}
            <section
              aria-labelledby="timer-heading"
              className="w-full rounded-2xl border-3 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#000] mb-6"
            >
              <div className="flex items-center justify-between mb-3">
                <h2
                  id="timer-heading"
                  className="flex items-center gap-2 text-sm sm:text-base font-black uppercase tracking-wide text-black"
                >
                  <Timer size={18} className="text-pink-600" />
                  2. Thời Gian Đếm Ngược
                </h2>
                <span className="text-xs font-mono font-bold text-zinc-500">
                  {timer} giây / mỗi ô
                </span>
              </div>

              <div
                role="group"
                aria-label="Chọn thời gian đếm ngược"
                className="grid grid-cols-3 gap-2.5"
              >
                {TIMER_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={timer === option.value}
                    onClick={() => setTimer(option.value)}
                    className={`flex flex-col items-center justify-center rounded-xl border-2 sm:border-3 border-black p-3 transition-all cursor-pointer ${
                      timer === option.value
                        ? "bg-yellow-300 shadow-[4px_4px_0px_0px_#000] -translate-y-1 font-black"
                        : "bg-zinc-100 hover:bg-yellow-100 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <span className="text-sm sm:text-base font-black text-black">
                      {option.label}
                    </span>
                    <span className="text-[10px] font-bold text-zinc-600 mt-0.5">
                      {option.desc}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* CTA BUTTON */}
            <Link
              href={`/capture?mode=${currentFrame.cutCount}cut`}
              className="group w-full mt-2"
            >
              <button className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border-3 sm:border-4 border-black bg-black py-4 px-6 text-lg sm:text-xl font-black text-white shadow-[6px_6px_0px_0px_#22d3ee] hover:bg-zinc-800 hover:shadow-[4px_4px_0px_0px_#22d3ee] hover:translate-y-0.5 hover:translate-x-0.5 transition-all">
                <span>TIẾP TỤC CHỤP ({currentFrame.cutCount} ẢNH)</span>
                <ArrowRight
                  size={22}
                  className="transition-transform group-hover:translate-x-1.5"
                />
              </button>
            </Link>
          </Y2kWindow>
        </div>

        {/* CỘT PHẢI: PREVIEW LIVE & SYSTEM TIPS (5 COLS TRÊN DESKTOP) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* CỬA SỔ LIVE PREVIEW */}
          <Y2kWindow
            title="C:\\LIVE_PREVIEW.EXE"
            className="w-full"
            bodyClassName="flex flex-col items-center bg-[#fffbe6] p-5 sm:p-6"
          >
            <div className="w-full flex items-center justify-between pb-3 border-b-2 border-black mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="font-black text-sm sm:text-base uppercase text-black truncate">
                  {currentFrame.name}
                </span>
              </div>
              <span className="bg-yellow-300 border-2 border-black font-mono text-[10px] font-black px-2 py-0.5 rounded-full shadow-[2px_2px_0px_0px_#000]">
                {currentFrame.cutCount} CUTS
              </span>
            </div>

            {/* KHUNG PREVIEW PHÓNG TO SẮC NÉT */}
            <div className="w-64 sm:w-72 max-w-full my-1 drop-shadow-md">
              <SelectedPreviewComponent
                photos={[
                  "/images/image1.png",
                  "/images/image2.png",
                  "/images/image3.png",
                  "/images/image4.png",
                ]}
                customText={currentFrame.defaultCustomText || "SAMPLE_SNAP"}
                signatureSize={16}
                renderMode={currentFrame.renderMode}
              />
            </div>

            {/* THÔNG TIN CHI TIẾT KHUNG */}
            <div className="w-full mt-4 pt-3 border-t-2 border-black/10 flex flex-col gap-2">
              <p className="text-center text-xs font-bold text-zinc-700">
                {currentFrame.description}
              </p>
              <div className="flex items-center justify-center gap-3 text-[10px] font-mono font-bold text-zinc-500 uppercase">
                <span>Tỉ lệ: {currentFrame.aspectRatio}</span>
                <span>•</span>
                <span>Độ nét: 2048px (HD 2X)</span>
              </div>
            </div>
          </Y2kWindow>

          {/* CỬA SỔ MẸO CHỤP GỌN GÀNG */}
          <Y2kWindow
            title="C:\\QUICK_TIPS.EXE"
            className="w-full"
            bodyClassName="p-4 bg-cyan-50 flex flex-col gap-2.5"
          >
            <div className="flex items-center gap-2 mb-1">
              <Info size={16} className="text-cyan-700" />
              <span className="font-black text-xs uppercase text-zinc-800">
                Mẹo Chụp Ảnh Xinh
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="flex items-center gap-2 bg-white p-2.5 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000]">
                <Sun size={18} className="text-amber-500 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-black uppercase">
                    Đủ Sáng
                  </span>
                  <span className="text-[9px] font-semibold text-zinc-600">
                    Đứng trước đèn
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white p-2.5 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000]">
                <UserCheck size={18} className="text-pink-500 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-black uppercase">
                    Đổi Dáng
                  </span>
                  <span className="text-[9px] font-semibold text-zinc-600">
                    3 kiểu khác nhau
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white p-2.5 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000]">
                <RefreshCw size={18} className="text-blue-500 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-black uppercase">
                    Retake
                  </span>
                  <span className="text-[9px] font-semibold text-zinc-600">
                    Chụp lại từng ô
                  </span>
                </div>
              </div>
            </div>
          </Y2kWindow>
        </div>
      </div>
    </div>
  );
}

export default function SetupPage() {
  return (
    <Y2kShell showStickers>
      <div className="mt-4 mb-2 sm:mt-6 sm:mb-4">
        <Y2kMarquee
          tone="cyan"
          items={[
            "CHOOSE YOUR FRAME",
            "WE BARE BEARS 3-CUT",
            "TAEKWONDO PANDA 3-CUT",
            "TẾT CỔ TRUYỀN 2026 MỚI",
            "MERRY CHRISTMAS",
            "Y2K BOOTH ONLINE",
          ]}
        />
      </div>

      <Suspense
        fallback={
          <div className="p-8 text-center font-bold">
            Đang tải phòng chụp...
          </div>
        }
      >
        <SetupContent />
      </Suspense>

      <div className="pb-4 sm:pb-6 pt-2">
        <FilmStripFooter text="PICK A FRAME • THEN SAY CHEESE" />
      </div>
    </Y2kShell>
  );
}
