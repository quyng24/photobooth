"""
Làm sạch overlay khung ảnh (public/frames/*@2x.png).

Nguyên nhân lỗi trong file gốc: cửa sổ trong suốt được cắt bằng mặt nạ alpha 1-bit
(0 hoặc 255) đi ngang qua giữa nét viền của khung -> nửa nét viền bị mất (lẹm mép),
mép bậc thang (răng cưa). Phần nửa nét viền đó vẫn còn nguyên trong kênh RGB của các
pixel alpha = 0.

Script đọc bản gốc trong scripts/frame-originals/ (chạy lại bao nhiêu lần cũng được):
  1. Tìm cửa sổ trong suốt của từng ô ảnh (flood fill từ tâm ô).
  2. Trong dải hẹp sát mép cửa sổ, khôi phục alpha mềm dựa trên độ đậm của nét viền
     (RGB còn nguyên) -> viền liền nét, mép anti-alias mượt, không còn lẹm.
  3. Ghi đè public/frames/<name>@2x.png và sinh lại bản 1x (premultiplied alpha).

Chạy:  python scripts/clean-frame-overlays.py [thư_mục_debug]
"""
import os
import sys

import cv2
import numpy as np
from scipy import ndimage

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "scripts", "frame-originals")
DST = os.path.join(ROOT, "public", "frames")

# Toạ độ ô ảnh theo đơn vị logic (khớp *_SLOTS trong src/frames/components)
FRAMES = {
    "we-bare-bears": [(52, 135, 388, 250), (52, 400, 388, 250), (52, 665, 388, 250)],
    "merry-christmas": [(150, 118, 272, 247), (150, 396, 272, 247), (150, 676, 272, 247)],
    "tet-holiday": [(150, 118, 272, 251), (150, 396, 272, 253), (150, 669, 272, 262)],
    "taekwondo-panda": [(83, 136, 516, 260), (83, 411, 516, 260), (83, 686, 516, 260)],
}

# Khung không khôi phục được nét viền trọn vẹn (RGB bị xoá một phần) thì giữ nguyên alpha gốc
RESTORE = {"we-bare-bears": True, "merry-christmas": True, "tet-holiday": False, "taekwondo-panda": True}

SCALE = 2
STRIP = 8  # px @2x: độ rộng dải sát mép cửa sổ được khôi phục alpha
REF_RADIUS = 10  # px @2x: bán kính tìm độ đậm của nét viền gần đó
NOISE_FLOOR = 45  # độ lệch so với trắng dưới mức này coi là nhiễu nền
BLOCK_WHITE = 246  # pixel trắng đặc còn sót lại trong ô (mặt nạ cắt không phủ hết)
BLOCK_MAX_AREA = 9000  # px @2x: mảng trắng sót lại lớn hơn mức này coi là nền/mascot, không đụng tới
MIN_REF = 90  # nếu quanh đó không có nét đủ đậm thì không khôi phục


def ellipse(r):
    return cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * r + 1, 2 * r + 1))


def clean(name, slots, debug_dir=None):
    img = cv2.imread(os.path.join(SRC, f"{name}@2x.png"), cv2.IMREAD_UNCHANGED)
    assert img is not None and img.shape[2] == 4, name
    h, w = img.shape[:2]
    rgb = img[:, :, :3][:, :, ::-1].astype(np.float32)  # BGR -> RGB
    alpha = img[:, :, 3].astype(np.float32)

    labels, _ = ndimage.label(alpha < 40)

    # "Độ đậm" so với nền trắng của cửa sổ: 0 = trắng, 255 = đen
    ink = 255.0 - rgb.min(axis=2)
    opaque = alpha > 200

    # Độ đậm của nét viền gần nhất (chỉ lấy từ pixel đặc)
    ref = cv2.dilate(np.where(opaque, ink, 0).astype(np.float32), ellipse(REF_RADIUS))

    new_alpha = alpha.copy()
    restored_total = 0
    removed_blocks = 0
    nearwhite = (rgb.min(axis=2) >= BLOCK_WHITE) & (alpha > 200)

    for (x, y, sw, sh) in slots:
        X, Y, SW, SH = x * SCALE, y * SCALE, sw * SCALE, sh * SCALE
        lab = labels[Y + SH // 2, X + SW // 2]
        if lab == 0:
            raise RuntimeError(f"{name}: tâm ô ảnh không nằm trong cửa sổ trong suốt")
        win = labels == lab

        # Mảng trắng đặc nhỏ, kín, sát cửa sổ = phần "ruột" cửa sổ bị mặt nạ cắt sót -> trắng đè lên ảnh
        if RESTORE[name]:
            touch = cv2.dilate(win.astype(np.uint8), ellipse(2)) > 0
            area_box = np.zeros((h, w), bool)
            area_box[max(Y - 40, 0) : Y + SH + 40, max(X - 40, 0) : X + SW + 40] = True
            cand = nearwhite & area_box & ~win
            comp, n = ndimage.label(cand)
            if n:
                sizes = ndimage.sum(cand, comp, index=np.arange(1, n + 1))
                touching = np.unique(comp[touch & cand])
                for cid in touching:
                    if cid and sizes[cid - 1] <= BLOCK_MAX_AREA:
                        win = win | (comp == cid)
                        removed_blocks += int(sizes[cid - 1])

        # khoảng cách từ pixel trong cửa sổ tới mép (pixel không thuộc cửa sổ)
        inside = cv2.distanceTransform(win.astype(np.uint8), cv2.DIST_L2, 5)
        strip = win & (inside <= STRIP)

        # pixel alpha=0 có RGB = (0,0,0) tuyệt đối là dữ liệu đã bị xoá, không phải nét vẽ thật
        erased = rgb.sum(axis=2) == 0
        new_alpha = np.where(win & (alpha > 0) & (inside > 0), 0, new_alpha)  # ruột trắng sót -> trong suốt
        usable = strip & (ref >= MIN_REF) & ~erased & RESTORE[name]
        a = (ink - NOISE_FLOOR) / np.maximum(ref - NOISE_FLOOR, 1.0)
        a = np.clip(a, 0.0, 1.0) * 255.0
        new_alpha = np.where(usable, np.maximum(new_alpha, a), new_alpha)
        restored_total += int(usable.sum())

    out = img.copy()
    out[:, :, 3] = np.clip(new_alpha, 0, 255).astype(np.uint8)
    cv2.imwrite(os.path.join(DST, f"{name}@2x.png"), out)

    # Bản 1x: thu nhỏ trên ảnh premultiplied để không lem viền
    al = out[:, :, 3:4].astype(np.float32) / 255.0
    pm = np.concatenate([out[:, :, :3].astype(np.float32) * al, al], axis=2)
    small = cv2.resize(pm, (w // SCALE, h // SCALE), interpolation=cv2.INTER_AREA)
    sa = np.clip(small[:, :, 3:4], 1e-4, 1.0)
    rgb1 = np.clip(small[:, :, :3] / sa, 0, 255)
    out1 = np.concatenate([rgb1, small[:, :, 3:4] * 255.0], axis=2).astype(np.uint8)
    cv2.imwrite(os.path.join(DST, f"{name}.png"), out1)

    print(f"{name}: khôi phục alpha cho {restored_total} pixel sát mép cửa sổ, bỏ {removed_blocks} pixel trắng sót")

    if debug_dir:
        bg = np.zeros((h, w, 3), np.float32)
        bg[:] = (255, 0, 255)  # BGR magenta
        comp = out[:, :, :3] * al + bg * (1 - al)
        cv2.imwrite(os.path.join(debug_dir, f"after_{name}.png"), comp.astype(np.uint8))


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    dbg = sys.argv[1] if len(sys.argv) > 1 else None
    for n, s in FRAMES.items():
        clean(n, s, dbg)
