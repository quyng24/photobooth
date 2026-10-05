"use client";

import Link from "next/link";
import {
  ArrowRight,
  LayoutTemplate,
  Sparkles,
  Image as ImageIcon,
  Check,
  ArrowLeft,
  Settings,
  Sun,
  UserCheck,
  BatteryCharging,
  Palette,
} from "lucide-react";
import { FRAME_STYLES, getFrameConfig, usePhotoStore } from "@/stores/photoStore";
import type { TimerOption } from "@/types";
import { Y2kShell } from "@/components/y2k/Y2kShell";
import { Y2kWindow } from "@/components/y2k/Y2kWindow";
import { Y2kSteps } from "@/components/y2k/Y2kSteps";
import { Y2kMarquee } from "@/components/y2k/Y2kMarquee";
import { FilmStripFooter } from "@/components/y2k/FilmStripFooter";

const TIMER_OPTIONS: TimerOption[] = [3, 5, 10];

export default function SetupPage() {
  const {
    cutMode,
    setCutMode,
    frameStyle,
    setFrameStyle,
    timer,
    setTimer,
  } = usePhotoStore();
  const selectedFrame = getFrameConfig(frameStyle);

  return (
    <Y2kShell showStickers>
      <div className="mt-4 mb-2 sm:mt-6 sm:mb-4">
        <Y2kMarquee
          tone="cyan"
          items={[
            "CHOOSE YOUR FRAME",
            "2-CUT MINI",
            "4-CUT CLASSIC",
            "Y2K BOOTH ONLINE",
          ]}
        />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center gap-6 px-4 pb-8 pt-2">
        {/* NAVBAR */}
        <div className="flex w-full items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border-3 border-black bg-white px-3 py-2 text-xs font-black shadow-[3px_3px_0px_0px_#000] hover:bg-yellow-300 hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all"
          >
            <ArrowLeft size={16} />
            TRANG CHỦ
          </Link>
          <Y2kSteps current={1} />
        </div>

        {/* TITLE */}
        <div className="flex items-center justify-center gap-2 mt-2 mb-2">
          <Sparkles
            className="h-7 w-7 shrink-0 text-yellow-400"
            fill="currentColor"
          />
          <h1 className="text-center text-3xl font-black uppercase tracking-tight drop-shadow-[2px_2px_0px_#22d3ee] sm:text-4xl text-black">
            Chọn Khung Ảnh
          </h1>
          <Sparkles
            className="h-7 w-7 shrink-0 text-pink-500"
            fill="currentColor"
          />
        </div>

         {/* MAIN LAYOUT */}
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7 flex flex-col">
            <Y2kWindow
              title="FRAME_SELECT.EXE"
              className="w-full h-full"
              bodyClassName="flex flex-col items-center bg-[#fffbe6] p-4 sm:p-6"
            >
              <div className="mb-6 grid w-full grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setCutMode("2cut")}
                  aria-pressed={cutMode === "2cut"}
                  className={`relative flex cursor-pointer flex-col items-center rounded-2xl border-3 border-black p-4 text-center transition-all ${
                    cutMode === "2cut"
                      ? "bg-cyan-300 shadow-[6px_6px_0px_0px_#000] -translate-y-1"
                      : "bg-white opacity-90 shadow-[3px_3px_0px_0px_#000] hover:opacity-100 hover:shadow-[4px_4px_0px_0px_#000]"
                  }`}
                >
                  <div className="mb-3 flex w-24 flex-col gap-1.5 rounded-lg border-2 border-black bg-white p-2">
                    <div className="flex aspect-4/3 items-center justify-center rounded border-2 border-black bg-pink-100">
                      <ImageIcon size={14} className="text-pink-400" />
                    </div>
                    <div className="flex aspect-4/3 items-center justify-center rounded border-2 border-black bg-pink-100">
                      <ImageIcon size={14} className="text-pink-400" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-lg sm:text-xl font-black uppercase">
                    <LayoutTemplate size={20} /> 2 CUT
                  </div>
                  <span className="text-xs font-bold text-black/70 mt-1">
                    Dải 2 ảnh • Gọn nhẹ
                  </span>
                  {cutMode === "2cut" && (
                    <div className="absolute -top-3 -right-3 rounded-full border-2 border-black bg-pink-500 p-1.5 text-white shadow-[2px_2px_0px_0px_#000]">
                      <Check size={16} strokeWidth={4} />
                    </div>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setCutMode("4cut")}
                  aria-pressed={cutMode === "4cut"}
                  className={`relative flex cursor-pointer flex-col items-center rounded-2xl border-3 border-black p-4 text-center transition-all ${
                    cutMode === "4cut"
                      ? "bg-pink-400 shadow-[6px_6px_0px_0px_#000] -translate-y-1 text-white"
                      : "bg-white opacity-90 shadow-[3px_3px_0px_0px_#000] hover:opacity-100 hover:shadow-[4px_4px_0px_0px_#000]"
                  }`}
                >
                  <div className="mb-3 grid w-24 grid-cols-2 gap-1.5 rounded-lg border-2 border-black bg-white p-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex aspect-4/3 items-center justify-center rounded border-2 border-black bg-cyan-100"
                      >
                        <ImageIcon size={12} className="text-cyan-500" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-lg sm:text-xl font-black uppercase">
                    <ImageIcon size={20} /> 4 CUT
                  </div>
                  <span
                    className={`text-xs font-bold mt-1 ${cutMode === "4cut" ? "text-white" : "text-black/70"}`}
                  >
                    Dải 4 ảnh • Chuẩn Hàn
                  </span>
                  {cutMode === "4cut" && (
                    <div className="absolute -top-3 -right-3 rounded-full border-2 border-black bg-yellow-300 p-1.5 text-black shadow-[2px_2px_0px_0px_#000]">
                      <Check size={16} strokeWidth={4} />
                    </div>
                  )}
                </button>
              </div>

              <section
                aria-labelledby="frame-style-heading"
                className={`mb-6 w-full rounded-2xl border-3 border-black p-3 shadow-[4px_4px_0px_0px_#000] sm:p-4 ${selectedFrame.background}`}
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h2
                    id="frame-style-heading"
                    className={`flex items-center gap-2 text-sm font-black uppercase tracking-wide sm:text-base ${selectedFrame.textColor}`}
                  >
                    <Palette size={18} />
                    Chọn màu frame
                  </h2>
                  {selectedFrame && (
                    <span
                      className={`rounded-full border-2 border-black bg-white px-2 py-1 text-[10px] font-black uppercase sm:text-xs ${selectedFrame.textColor}`}
                    >
                      {selectedFrame.name}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {FRAME_STYLES.map((frame) => (
                    <button
                      key={frame.id}
                      type="button"
                      aria-pressed={frameStyle === frame.id}
                      onClick={() => setFrameStyle(frame.id)}
                      className={`flex min-h-16 items-center justify-center rounded-xl border-2 border-black px-2 py-2 text-center text-xs font-black transition-all sm:min-h-20 sm:text-sm ${frame.background} ${
                        frameStyle === frame.id
                          ? "ring-4 ring-white ring-offset-2 ring-offset-black"
                          : "hover:-translate-y-0.5"
                      }`}
                    >
                      {frame.name}
                    </button>
                  ))}
                </div>

                <p className={`mt-3 text-[11px] font-bold ${selectedFrame.textColor}`}>
                  Frame đã chọn sẽ được giữ khi chuyển sang màn hình chụp.
                </p>
              </section>

              <section
                aria-labelledby="timer-heading"
                className="mb-6 w-full rounded-2xl border-3 border-black bg-white p-3 shadow-[4px_4px_0px_0px_#000] sm:p-4"
              >
                <h2
                  id="timer-heading"
                  className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-wide sm:text-base"
                >
                  <Settings size={18} />
                  Thời gian đếm ngược
                </h2>
                <div
                  role="group"
                  aria-label="Chọn thời gian đếm ngược"
                  className="grid grid-cols-3 gap-2"
                >
                  {TIMER_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={timer === option}
                      onClick={() => setTimer(option)}
                      className={`rounded-xl border-2 border-black px-3 py-3 text-sm font-black transition-all ${
                        timer === option
                          ? "bg-yellow-300 shadow-[3px_3px_0px_0px_#000] -translate-y-0.5"
                          : "bg-zinc-100 hover:bg-yellow-100"
                      }`}
                    >
                      {option} giây
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs font-semibold text-zinc-600">
                  Áp dụng cho mỗi lần chụp và chụp lại.
                </p>
              </section>

              <Link
                href={`/capture?mode=${cutMode}`}
                className="group w-full mt-auto"
              >
                <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-3 border-black bg-black py-4 text-lg font-black text-white shadow-[6px_6px_0px_0px_#22d3ee] hover:bg-zinc-800 hover:shadow-[4px_4px_0px_0px_#22d3ee] hover:translate-y-0.5 hover:translate-x-0.5 transition-all">
                  TIẾP TỤC CHỤP
                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </Link>
            </Y2kWindow>
          </div>

          <div className="lg:col-span-5 flex flex-col h-full">
            <Y2kWindow
              title="SYSTEM_CHECK.EXE"
              className="w-full h-full"
              bodyClassName="flex flex-col bg-cyan-50 p-4 sm:p-5 h-full"
            >
              <div className="flex items-center gap-2 mb-4 border-b-3 border-black pb-3">
                <Settings className="w-5 h-5 text-cyan-500 animate-spin-slow" />
                <h3 className="font-black text-lg uppercase tracking-wider">
                  Chuẩn bị trước khi chụp
                </h3>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3 bg-white p-3 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#000]">
                  <div className="bg-yellow-300 p-2 border-2 border-black rounded-lg">
                    <Sun className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase">
                      Ánh sáng là chân lý
                    </h4>
                    <p className="text-xs font-semibold text-zinc-600 mt-0.5">
                      Hãy xoay mặt về phía nguồn sáng (cửa sổ, đèn) để ảnh nét
                      căng.
                    </p>
                  </div>
                </div>

                 <div className="flex items-start gap-3 bg-white p-3 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#000]">
                  <div className="bg-pink-300 p-2 border-2 border-black rounded-lg">
                    <UserCheck className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase">
                      Chuẩn bị sẵn dáng
                    </h4>
                    <p className="text-xs font-semibold text-zinc-600 mt-0.5">
                      Hệ thống sẽ đếm ngược 3 giây cho mỗi tấm ảnh. Nghĩ dáng
                      trước nhé!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#000]">
                  <div className="bg-green-400 p-2 border-2 border-black rounded-lg">
                    <BatteryCharging className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase">
                      Check lại pin & kết nối
                    </h4>
                    <p className="text-xs font-semibold text-zinc-600 mt-0.5">
                      Tránh sập nguồn giữa lúc đang &quot;cháy&quot; phô ảnh đẹp
                      nhất.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6 text-center">
                <span className="inline-block bg-black text-yellow-300 font-mono text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded uppercase border-2 border-white shadow-[2px_2px_0px_0px_#000]">
                  STATUS: READY_TO_SHOOT
                </span>
              </div>
            </Y2kWindow>
          </div>
        </div>
      </div>

      <div className="pb-4 sm:pb-6 pt-2">
        <FilmStripFooter text="PICK A FRAME • THEN SAY CHEESE" />
      </div>
    </Y2kShell>
  );
}
