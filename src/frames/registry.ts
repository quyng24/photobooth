import type { FrameTemplate } from "./types";
import { WeBareBearsFrame, drawWeBareBearsCanvas, WE_BARE_BEARS_SLOTS } from "./components/WeBareBearsFrame";
import { TaekwondoPandaFrame, drawTaekwondoPandaCanvas, TAEKWONDO_PANDA_SLOTS } from "./components/TaekwondoPandaFrame";
import { MerryChristmasFrame, drawMerryChristmasCanvas, MERRY_CHRISTMAS_SLOTS } from "./components/MerryChristmasFrame";
import { TetHolidayFrame, drawTetHolidayCanvas, TET_HOLIDAY_SLOTS } from "./components/TetHolidayFrame";

/**
 * DANH SÁCH CÁC KHUNG FRAME CỦA PHOTOBOOTH
 * Khung hoạt hình chuẩn HD sử dụng hoàn toàn frame ảnh gốc.
 * Sau này khi bạn muốn thêm một khung mới:
 * Chỉ cần thêm 1 object vào mảng FRAME_TEMPLATES bên dưới!
 */
export const FRAME_TEMPLATES: FrameTemplate[] = [
  {
    id: "we-bare-bears",
    name: "We Bare Bears",
    description: "Khung We Bare Bears 3 ô kích thước đồng nhất chuẩn HD",
    category: "cartoon",
    cutCount: 3,
    width: 512,
    height: 1024,
    aspectRatio: "512 / 1024",
    slots: WE_BARE_BEARS_SLOTS,
    renderMode: "image",
    hasImageFallback: false,
    overlayImage: "/frames/we-bare-bears.png",
    previewImage: "/frames/we-bare-bears.jpg",
    defaultCustomText: "WE_BARE_BEARS",
    theme: {
      bgPreview: "bg-[#fff7ee]",
      textColor: "text-[#543018]",
      textHexColor: "#543018",
      accentColor: "#b45309",
      badgeText: "3 Ô • GẤU NÂU",
    },
    signaturePosition: {
      x: 470,
      y: 990,
      align: "right",
    },
    Component: WeBareBearsFrame,
    drawCanvas: drawWeBareBearsCanvas,
  },
  {
    id: "taekwondo-panda",
    name: "Taekwondo Panda",
    description: "Khung võ thuật Gấu Trúc Taekwondo 3 ô chuẩn HD",
    category: "cartoon",
    cutCount: 3,
    width: 682,
    height: 1024,
    aspectRatio: "682 / 1024",
    slots: TAEKWONDO_PANDA_SLOTS,
    renderMode: "image",
    hasImageFallback: false,
    overlayImage: "/frames/taekwondo-panda.png",
    previewImage: "/frames/taekwondo-panda.jpg",
    defaultCustomText: "TAEKWONDO_PANDA",
    theme: {
      bgPreview: "bg-[#f4f7fb]",
      textColor: "text-[#181715]",
      textHexColor: "#181715",
      accentColor: "#2563eb",
      badgeText: "3 Ô • GẤU TRÚC",
    },
    signaturePosition: {
      x: 585,
      y: 980,
      align: "right",
    },
    Component: TaekwondoPandaFrame,
    drawCanvas: drawTaekwondoPandaCanvas,
  },
  {
    id: "merry-christmas",
    name: "Merry Christmas",
    description: "Khung Giáng Sinh Vintage 3 ô kích thước đồng nhất chuẩn HD",
    category: "holiday",
    cutCount: 3,
    width: 571,
    height: 1024,
    aspectRatio: "571 / 1024",
    slots: MERRY_CHRISTMAS_SLOTS,
    renderMode: "image",
    hasImageFallback: false,
    overlayImage: "/frames/merry-christmas.png",
    previewImage: "/frames/merry-christmas.jpg",
    defaultCustomText: "MERRY_CHRISTMAS",
    theme: {
      bgPreview: "bg-[#F7F1E1]",
      textColor: "text-[#8e2a2b]",
      textHexColor: "#8e2a2b",
      accentColor: "#dc2626",
      badgeText: "3 Ô • GIÁNG SINH",
    },
    signaturePosition: {
      x: 285.5,
      y: 968,
      align: "center",
    },
    Component: MerryChristmasFrame,
    drawCanvas: drawMerryChristmasCanvas,
  },
  {
    id: "tet-holiday",
    name: "Tết Cổ Truyền",
    description: "Khung Tết Cổ Truyền Việt Nam với Bánh Chưng, Bao Lì Xì và Hoa Mai Đào",
    category: "holiday",
    cutCount: 3,
    width: 571,
    height: 1024,
    aspectRatio: "571 / 1024",
    slots: TET_HOLIDAY_SLOTS,
    renderMode: "image",
    hasImageFallback: false,
    overlayImage: "/frames/tet-holiday.png",
    previewImage: "/frames/tet-holiday.jpg",
    defaultCustomText: "CHÚC_MỪNG_NĂM_MỚI",
    theme: {
      bgPreview: "bg-[#FDF6E2]",
      textColor: "text-[#B91C1C]",
      textHexColor: "#B91C1C",
      accentColor: "#D97706",
      badgeText: "3 Ô • TẾT CỔ TRUYỀN",
    },
    signaturePosition: {
      x: 285.5,
      y: 984,
      align: "center",
    },
    Component: TetHolidayFrame,
    drawCanvas: drawTetHolidayCanvas,
  },
];

export const DEFAULT_FRAME_ID = "we-bare-bears";

export function getFrame(id: string): FrameTemplate {
  return (
    FRAME_TEMPLATES.find((f) => f.id === id) ||
    FRAME_TEMPLATES[0]
  );
}
