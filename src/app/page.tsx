import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Wand2,
  Download,
  Sparkles,
  Flame,
  CheckCircle2,
  Palette,
} from "lucide-react";
import { Y2kShell } from "@/components/y2k/Y2kShell";
import { Y2kWindow } from "@/components/y2k/Y2kWindow";
import { Y2kMarquee } from "@/components/y2k/Y2kMarquee";
import { FilmStripFooter } from "@/components/y2k/FilmStripFooter";
import { HomeMascot } from "@/components/y2k/HomeMascot";
import { FRAME_TEMPLATES } from "@/frames/registry";

export default function Home() {
  return (
    <Y2kShell showStickers={true}>
      {/* HEADER BAR */}
      <header className="relative z-10 mx-auto mt-4 sm:mt-6 flex w-[calc(100%-2rem)] max-w-7xl shrink-0 items-center justify-between rounded-2xl border-3 sm:border-4 border-black bg-white px-4 py-3 shadow-[5px_5px_0px_0px_#000]">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border-2 sm:border-3 border-black bg-pink-500 font-mono text-xs sm:text-sm font-black text-white shadow-[2px_2px_0px_0px_#000]">
            Y2K
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-base sm:text-xl font-black tracking-wider uppercase leading-tight">
              SNAP<span className="text-pink-500">BOOTH</span>
            </span>
            <span className="text-[10px] font-bold text-zinc-500 tracking-wide uppercase hidden sm:inline">
              Photobooth Chuẩn Hàn Quốc
            </span>
          </div>
        </div>

        {/* Status badges - visible on desktop */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-yellow-300 px-3 py-1 font-mono text-xs font-black shadow-[2px_2px_0px_0px_#000]">
            <Sparkles size={13} /> 4 KHUNG ĐỘC QUYỀN
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-cyan-300 px-3 py-1 font-mono text-xs font-black shadow-[2px_2px_0px_0px_#000]">
            <CheckCircle2 size={13} /> MIỄN PHÍ 100%
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-pink-200 px-3 py-1 font-mono text-xs font-black shadow-[2px_2px_0px_0px_#000]">
            ★ HD 2X CANVAS
          </span>
        </div>

        <Link
          href="/setup"
          className="group inline-flex items-center gap-2 rounded-xl border-2 sm:border-3 border-black bg-black px-4 py-2 text-xs sm:text-sm font-black text-white shadow-[3px_3px_0px_0px_#ff69b4] hover:bg-zinc-800 hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all"
        >
          <Camera size={16} />
          <span>VÀO CHỤP</span>
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </header>

      {/* MARQUEE BANNER */}
      <div className="my-5 sm:my-6">
        <Y2kMarquee
          items={[
            "📸 Y2K SNAPBOOTH",
            "✨ 4 MẪU KHUNG ĐỘC QUYỀN",
            "🥋 GẤU TRÚC TAEKWONDO",
            "🧧 TẾT CỔ TRUYỀN 2026 MỚI",
            "🐻 WE BARE BEARS",
            "🎄 MERRY CHRISTMAS",
            "⚡ RETAKE KHÔNG GIỚI HẠN",
            "💾 XUẤT ẢNH HD 2X SIÊU NÉT",
            "SAY CHEESE ★",
          ]}
          tone="cyan"
        />
      </div>

      {/* MAIN CONTAINER */}
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 sm:gap-14 px-4 sm:px-6 lg:px-8 pb-16 pt-2">
        {/* HERO SECTION: 2 CỘT CÂN ĐỐI TRÊN DESKTOP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* CỘT TRÁI: CỬA SỔ GIỚI THIỆU & NÚT HÀNH ĐỘNG (7 COLS) */}
          <div className="lg:col-span-7 flex flex-col w-full">
            <Y2kWindow
              title="C:\\SNAP_BOOTH.EXE"
              className="w-full"
              bodyClassName="flex flex-col p-6 sm:p-8 bg-white"
            >
              {/* Top Tag & Badge */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="inline-flex items-center gap-1.5 bg-yellow-300 text-black border-2 border-black font-black text-xs px-3 py-1 rounded-full uppercase shadow-[2px_2px_0px_#000] -rotate-1">
                  <Flame className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                  WEB PHOTOBOOTH ĐỈNH NHẤT
                </div>
                <div className="inline-flex items-center gap-1 bg-pink-100 text-pink-700 border-2 border-black font-mono font-bold text-xs px-2.5 py-1 rounded-full shadow-[2px_2px_0px_#000]">
                  <Sparkles size={12} /> V2.5 ONLINE
                </div>
              </div>

              {/* Hero Heading */}
              <h1 className="mb-4 text-4xl sm:text-6xl font-black tracking-tight uppercase leading-none text-black drop-shadow-[3px_3px_0px_#ff69b4]">
                SNAP &{" "}
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  SHARE
                </span>
                <span className="block text-2xl sm:text-4xl text-black drop-shadow-[2px_2px_0px_#22d3ee] mt-1">
                  PHOTOBOOTH K-STYLE
                </span>
              </h1>

              {/* Description */}
              <p className="mb-6 max-w-xl text-sm sm:text-base font-bold leading-relaxed text-zinc-700">
                Tạo dải ảnh photobooth phong cách Hàn Quốc siêu xinh ngay trên trình duyệt máy tính và điện thoại. Thỏa sức chọn khung hoạt hình{" "}
                <strong className="text-black underline decoration-yellow-400 decoration-3">
                  We Bare Bears
                </strong>
                ,{" "}
                <strong className="text-black underline decoration-cyan-400 decoration-3">
                  Taekwondo Panda
                </strong>
                , khung{" "}
                <strong className="text-black underline decoration-red-400 decoration-3">
                  Tết Cổ Truyền
                </strong>{" "}
                hoàn toàn miễn phí!
              </p>

              {/* Checklist Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-8">
                <div className="flex items-center gap-2 rounded-xl border-2 border-black bg-amber-50 p-2.5 shadow-[2px_2px_0px_0px_#000]">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-yellow-300 border border-black font-black text-xs">
                    ✓
                  </div>
                  <span className="text-xs font-black uppercase text-zinc-800">
                    3 Ô ảnh chuẩn
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border-2 border-black bg-cyan-50 p-2.5 shadow-[2px_2px_0px_0px_#000]">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-cyan-300 border border-black font-black text-xs">
                    ★
                  </div>
                  <span className="text-xs font-black uppercase text-zinc-800">
                    4 Khung độc quyền
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border-2 border-black bg-pink-50 p-2.5 shadow-[2px_2px_0px_0px_#000]">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-pink-300 border border-black font-black text-xs">
                    ⚡
                  </div>
                  <span className="text-xs font-black uppercase text-zinc-800">
                    Xuất HD 2X nét căng
                  </span>
                </div>
              </div>

              {/* Action Buttons & Mascot */}
              <div className="flex flex-wrap items-center gap-4 pt-2 border-t-2 border-black/10">
                <Link
                  href="/setup"
                  className="group inline-flex cursor-pointer items-center justify-center gap-3 rounded-2xl border-3 border-black bg-cyan-400 px-6 py-4 text-base sm:text-lg font-black text-black shadow-[6px_6px_0px_0px_#000] hover:bg-pink-400 hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 hover:-translate-x-1 transition-all"
                >
                  <Camera className="h-6 w-6" />
                  <span>BẮT ĐẦU CHỤP NGAY</span>
                  <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1.5" />
                </Link>

                <div className="flex items-center gap-3">
                  <div className="shrink-0 -mt-2">
                    <HomeMascot />
                  </div>
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wide hidden sm:block">
                    ← Rê chuột chơi cùng mèo Y2K!
                  </span>
                </div>
              </div>
            </Y2kWindow>
          </div>

          {/* CỘT PHẢI: BỨC TƯỜNG DÁN ẢNH PHOTOBOOTH 3D (5 COLS) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full pt-4 pb-6">
            <div className="relative w-full max-w-[420px] h-[520px] sm:h-[580px] flex items-center justify-center">
              {/* Nền đổ bóng decor */}
              <div className="absolute inset-0 bg-radial from-pink-300/40 via-purple-200/20 to-transparent rounded-3xl -z-10 blur-xl" />

              {/* STRIP 1: We Bare Bears (Trái, Xoay -8 độ) */}
              <div className="absolute left-2 sm:left-4 top-6 w-36 sm:w-44 transform -rotate-8 hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 cursor-pointer shadow-[6px_6px_0px_0px_#000] rounded-xl border-3 border-black bg-[#fff7ee] overflow-hidden p-1.5 z-10">
                <div className="flex items-center justify-between pb-1 px-1 border-b border-black/20">
                  <span className="font-mono text-[9px] font-black text-[#543018]">
                    WE BARE BEARS
                  </span>
                  <span className="text-[8px] font-mono font-bold bg-[#543018] text-white px-1 rounded">
                    3 Ô
                  </span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/frames/we-bare-bears.jpg"
                  alt="We Bare Bears Frame"
                  className="w-full aspect-[512/1024] object-cover rounded-lg border border-black/20 mt-1"
                />
                <div className="text-center py-1">
                  <span className="font-mono text-[9px] font-black text-[#543018]">
                    ★ GẤU NÂU
                  </span>
                </div>
              </div>

              {/* STRIP 2: Tết Cổ Truyền (Chính giữa, Nổi bật, Z-20) */}
              <div className="absolute top-0 w-44 sm:w-52 transform rotate-2 hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 cursor-pointer shadow-[10px_10px_0px_0px_#000] rounded-2xl border-4 border-black bg-[#FDF6E2] overflow-hidden p-2 z-20">
                <div className="flex items-center justify-between pb-1.5 px-1 border-b-2 border-black">
                  <span className="font-mono text-[10px] sm:text-xs font-black text-red-700">
                    TẾT CỔ TRUYỀN
                  </span>
                  <span className="text-[9px] font-mono font-black bg-red-600 text-yellow-300 px-1.5 py-0.5 rounded-full border border-black">
                    MỚI
                  </span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/frames/tet-holiday.jpg"
                  alt="Tết Cổ Truyền Frame"
                  className="w-full aspect-[571/1024] object-cover rounded-xl border-2 border-black mt-1.5 shadow-sm"
                />
                <div className="text-center py-1.5">
                  <span className="font-mono text-[10px] font-black text-red-700 uppercase tracking-wider">
                    CHÚC MỪNG NĂM MỚI
                  </span>
                </div>
              </div>

              {/* STRIP 3: Taekwondo Panda (Phải, Xoay 10 độ) */}
              <div className="absolute right-2 sm:right-4 top-8 w-36 sm:w-44 transform rotate-10 hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 cursor-pointer shadow-[6px_6px_0px_0px_#000] rounded-xl border-3 border-black bg-[#f4f7fb] overflow-hidden p-1.5 z-10">
                <div className="flex items-center justify-between pb-1 px-1 border-b border-black/20">
                  <span className="font-mono text-[9px] font-black text-black">
                    TAEKWONDO
                  </span>
                  <span className="text-[8px] font-mono font-bold bg-blue-600 text-white px-1 rounded">
                    HOT
                  </span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/frames/taekwondo-panda.jpg"
                  alt="Taekwondo Panda Frame"
                  className="w-full aspect-[682/1024] object-cover rounded-lg border border-black/20 mt-1"
                />
                <div className="text-center py-1">
                  <span className="font-mono text-[9px] font-black text-black">
                    🥋 GẤU TRÚC
                  </span>
                </div>
              </div>

              {/* STICKERS Y2K NỔI */}
              <div className="absolute -top-3 right-6 bg-yellow-300 border-3 border-black font-black text-xs px-3 py-1 rounded-full uppercase transform rotate-12 shadow-[3px_3px_0px_#000] z-30">
                ⭐ TOP TRENDING!
              </div>
              <div className="absolute -bottom-2 left-6 bg-pink-400 text-white border-3 border-black font-black text-xs px-3 py-1 rounded-full uppercase transform -rotate-6 shadow-[3px_3px_0px_#000] z-30">
                💖 100% MIỄN PHÍ
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: BỘ SƯU TẬP 4 KHUNG ẢNH (GRID 4 CARDS ĐỒNG ĐỀU TRÊN DESKTOP) */}
        <section className="w-full">
          <Y2kWindow
            title="C:\\COLLECTION\\FRAME_TEMPLATES.DAT"
            className="w-full"
            bodyClassName="p-6 sm:p-8 bg-[#fffdf0]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b-3 border-black">
              <div>
                <div className="flex items-center gap-2">
                  <Palette className="w-6 h-6 text-pink-500" />
                  <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black">
                    Bộ Sưu Tập Khung Ảnh ({FRAME_TEMPLATES.length} Mẫu)
                  </h2>
                </div>
                <p className="text-xs sm:text-sm font-bold text-zinc-600 mt-1">
                  Nhấp vào mẫu bạn thích để bắt đầu chụp với khung tương ứng!
                </p>
              </div>

              <Link
                href="/setup"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border-2 border-black bg-yellow-300 px-3.5 py-2 font-mono text-xs font-black shadow-[3px_3px_0px_#000] hover:bg-yellow-400 hover:-translate-y-0.5 transition-all"
              >
                XEM TẤT CẢ KHUNG <ArrowRight size={14} />
              </Link>
            </div>

            {/* Grid 4 khung cân đối */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {FRAME_TEMPLATES.map((frame) => (
                <Link
                  key={frame.id}
                  href={`/setup?frame=${frame.id}`}
                  className={`group relative flex flex-col rounded-2xl border-3 border-black p-3 text-left transition-all cursor-pointer ${frame.theme.bgPreview} shadow-[4px_4px_0px_0px_#000] hover:shadow-[7px_7px_0px_0px_#000] hover:-translate-y-1`}
                >
                  {/* Badge số ô & thể loại */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] font-black bg-black text-white px-2 py-0.5 rounded-md">
                      {frame.cutCount} Ô CHỤP
                    </span>
                    {frame.id === "tet-holiday" ? (
                      <span className="font-mono text-[9px] font-black bg-red-600 text-yellow-300 px-1.5 py-0.5 rounded border border-black animate-pulse">
                        MỚI
                      </span>
                    ) : (
                      <span className="font-mono text-[9px] font-bold text-zinc-600">
                        HD 2X
                      </span>
                    )}
                  </div>

                  {/* Thumbnail */}
                  <div className="relative w-full aspect-[3/4] rounded-xl border-2 border-black bg-white overflow-hidden mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={frame.previewImage || frame.overlayImage}
                      alt={frame.name}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-black text-sm uppercase truncate text-black group-hover:text-pink-600 transition-colors">
                        {frame.name}
                      </h3>
                      <p className="text-[11px] font-bold text-zinc-600 line-clamp-1 mt-0.5">
                        {frame.theme.badgeText}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t-2 border-black/10 flex items-center justify-between">
                      <span className="text-[10px] font-mono font-black text-zinc-500 uppercase">
                        CHỌN MẪU
                      </span>
                      <div className="w-6 h-6 rounded-lg border-2 border-black bg-black text-white flex items-center justify-center group-hover:bg-pink-500 transition-colors">
                        <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Y2kWindow>
        </section>

        {/* SECTION: TÍNH NĂNG 3 BƯỚC CỰC SLAY */}
        <Y2kWindow
          title="C:\\TINH_NANG_CUC_SLAY.TXT"
          className="w-full"
          bodyClassName="p-6 sm:p-8 bg-zinc-50"
        >
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black">
              Chụp Ảnh Cực Dễ Chỉ Với 3 Bước
            </h2>
            <p className="text-xs sm:text-sm font-bold text-zinc-600 mt-1">
              Không cần tải app, không cần đăng nhập — mở trình duyệt là có ngay ảnh xinh!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-pink-200 border-3 border-black p-5 rounded-2xl shadow-[5px_5px_0px_0px_#000] hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-white border-2 border-black rounded-xl flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_#000]">
                <Camera className="w-6 h-6 text-pink-600" />
              </div>
              <div className="inline-block bg-black text-white font-mono text-[10px] font-black px-2 py-0.5 rounded mb-2">
                BƯỚC 01
              </div>
              <h3 className="font-black text-lg uppercase mb-1.5 text-black">
                1. Chụp Thả Ga
              </h3>
              <p className="text-xs sm:text-sm font-bold text-zinc-700 leading-relaxed">
                Hỗ trợ webcam laptop và camera điện thoại. Đếm ngược thông minh 3s - 5s - 10s và cho phép chụp lại từng ô nếu chưa ưng ý.
              </p>
            </div>

            <div className="bg-cyan-200 border-3 border-black p-5 rounded-2xl shadow-[5px_5px_0px_0px_#000] hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-white border-2 border-black rounded-xl flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_#000]">
                <Wand2 className="w-6 h-6 text-cyan-600" />
              </div>
              <div className="inline-block bg-black text-white font-mono text-[10px] font-black px-2 py-0.5 rounded mb-2">
                BƯỚC 02
              </div>
              <h3 className="font-black text-lg uppercase mb-1.5 text-black">
                2. Decor Cực Slay
              </h3>
              <p className="text-xs sm:text-sm font-bold text-zinc-700 leading-relaxed">
                4 mẫu khung hoạt hình & lễ hội độc quyền, bộ filter phim retro Y2K, viết chữ ký kỷ niệm tùy chỉnh font và sticker.
              </p>
            </div>

            <div className="bg-yellow-200 border-3 border-black p-5 rounded-2xl shadow-[5px_5px_0px_0px_#000] hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-white border-2 border-black rounded-xl flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_#000]">
                <Download className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="inline-block bg-black text-white font-mono text-[10px] font-black px-2 py-0.5 rounded mb-2">
                BƯỚC 03
              </div>
              <h3 className="font-black text-lg uppercase mb-1.5 text-black">
                3. Xuất & In Ảnh HD
              </h3>
              <p className="text-xs sm:text-sm font-bold text-zinc-700 leading-relaxed">
                Xuất file dải ảnh ở độ phân giải 2X siêu nét (2048px), sẵn sàng tải về máy, in ra giấy ảnh hoặc chia sẻ lên Story ngay lập tức!
              </p>
            </div>
          </div>
        </Y2kWindow>
      </main>

      {/* FOOTER */}
      <FilmStripFooter text="Y2K SNAPBOOTH • SAY CHEESE • LIFE 4-CUT EXPERIENCE" />
    </Y2kShell>
  );
}
