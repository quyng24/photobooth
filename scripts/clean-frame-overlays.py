"""
Làm sạch overlay khung ảnh (public/frames/*@2x.png) bằng ảnh gốc public/frames/*.jpg.

Vấn đề trong file PNG hiện tại: cửa sổ trong suốt được cắt bằng mặt nạ alpha 1-bit
(0/255) đi ngang qua giữa nét viền và qua người mascot -> lẹm mép, răng cưa, sót mảng
trắng, mascot bị cắt cụt. PNG @2x thực chất là bản phóng to của ảnh gốc .jpg
(đã kiểm tra: khớp từng pixel, sai khác trung bình ~1/255), nên .jpg còn đủ thông tin
về cả viền khung lẫn mascot nằm trong ô ảnh.

Cách làm (đọc bản gốc trong scripts/frame-originals/, chạy lại bao nhiêu lần cũng được):
  1. Trên ảnh .jpg, tìm "ruột trắng" của từng cửa sổ bằng flood fill từ tâm ô.
     Nét viền và mascot chặn flood nên ruột này không chứa viền hay mascot.
  2. Alpha mới: ruột = trong suốt; xa ruột = đặc; dải hẹp sát mép dùng alpha mềm tính từ
     độ đậm của nét vẽ (tách màu khỏi nền trắng) -> mép mượt, không còn răng cưa.
  3. Phần mascot/viền từng bị mặt nạ cũ cắt mất được khôi phục từ .jpg.
  4. Ghi đè public/frames/<name>@2x.png và sinh lại bản 1x (premultiplied alpha).

Chạy:  python scripts/clean-frame-overlays.py [thư_mục_debug]
"""
import os
import shutil
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

# Ruột cửa sổ trong .jpg của khung này màu kem (trùng màu nền), không tách được bằng flood trắng
SKIP = {"tet-holiday"}

SCALE = 2
WHITE_MIN = 244  # kênh nhỏ nhất >= ngưỡng này coi là "ruột trắng" của cửa sổ (trên ảnh jpg 1x)
POCKET_CORNER = 12  # px @1x: túi phải nằm trong bán kính này quanh góc ô
POCKET_MAX = 500  # px @1x: túi trắng kẹt ở góc nhỏ hơn mức này được nhập vào cửa sổ
BAND = 5  # px @2x: độ rộng dải mép dùng alpha mềm
REF_RADIUS = 7  # px @2x: bán kính tìm độ đậm nét vẽ gần đó
NOISE_FLOOR = 25  # độ lệch so với trắng dưới mức này coi là nhiễu nén jpg
MIN_REF = 70  # nếu quanh đó không có nét đủ đậm thì coi là đặc


def ellipse(r):
    return cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * r + 1, 2 * r + 1))


def clean(name, slots, debug_dir=None):
    png = cv2.imread(os.path.join(SRC, f"{name}@2x.png"), cv2.IMREAD_UNCHANGED)
    jpg = cv2.imread(os.path.join(DST, f"{name}.jpg"))
    assert png is not None and png.shape[2] == 4 and jpg is not None, name
    H, W = png.shape[:2]
    h1, w1 = jpg.shape[:2]
    assert (H, W) == (h1 * SCALE, w1 * SCALE), f"{name}: kích thước jpg/png không khớp"

    png_rgb = png[:, :, :3][:, :, ::-1].astype(np.float32)  # RGB
    png_a = png[:, :, 3].astype(np.float32)
    jpg_rgb = jpg[:, :, ::-1].astype(np.float32)
    j2 = cv2.resize(jpg_rgb, (W, H), interpolation=cv2.INTER_CUBIC)

    # 1. Ruột trắng của từng cửa sổ trên ảnh jpg gốc
    lab, _ = ndimage.label(jpg_rgb.min(axis=2) >= WHITE_MIN)
    core1 = np.zeros((h1, w1), bool)
    for (x, y, sw, sh) in slots:
        l = lab[y + sh // 2, x + sw // 2]
        if l == 0:
            raise RuntimeError(f"{name}: tâm ô ảnh không nằm trong ruột trắng")
        region = lab == l
        area = region.sum() / float(sw * sh)
        if not 0.80 <= area <= 1.05:
            raise RuntimeError(f"{name}: vùng cửa sổ bất thường (tỉ lệ diện tích {area:.2f}), flood bị rò")
        core1 |= region
    # Các túi trắng nhỏ kẹt ở góc bo (giữa ruột và nét viền) cũng là ruột cửa sổ
    near = cv2.dilate(core1.astype(np.uint8), ellipse(3)) > 0
    white1 = jpg_rgb.min(axis=2) >= WHITE_MIN
    pockets, n_p = ndimage.label(white1 & ~core1)
    if n_p:
        sizes = ndimage.sum(white1 & ~core1, pockets, index=np.arange(1, n_p + 1))
        centers = ndimage.center_of_mass(white1 & ~core1, pockets, index=np.arange(1, n_p + 1))
        corners = [
            (y + dy, x + dx) for (x, y, sw, sh) in slots for dx in (0, sw) for dy in (0, sh)
        ]
        for cid in np.unique(pockets[near & white1 & ~core1]):
            if not cid or sizes[cid - 1] > POCKET_MAX:
                continue
            cy, cx = centers[cid - 1]
            # chỉ nhận túi nằm ngay góc ô (giữa ruột và nét viền bo góc), không đụng tai/mắt mascot
            if any(abs(cy - ky) <= POCKET_CORNER and abs(cx - kx) <= POCKET_CORNER for ky, kx in corners):
                core1 |= pockets == cid
    core = cv2.resize(core1.astype(np.uint8), (W, H), interpolation=cv2.INTER_NEAREST) > 0

    # 2. Khoảng cách tới mép ruột (dương = trong ruột, âm = ngoài ruột)
    d_in = cv2.distanceTransform(core.astype(np.uint8), cv2.DIST_L2, 5)
    d_out = cv2.distanceTransform((~core).astype(np.uint8), cv2.DIST_L2, 5)
    signed = np.where(core, d_in, -d_out)

    # 3. Alpha mềm trong dải mép: tách nét vẽ khỏi nền trắng
    ink = 255.0 - j2.min(axis=2)
    ref = cv2.dilate(np.where(signed < -0.5, ink, 0).astype(np.float32), ellipse(REF_RADIUS))
    soft_a = np.clip((ink - NOISE_FLOOR) / np.maximum(ref - NOISE_FLOOR, 1.0), 0.0, 1.0)
    soft_a = np.where(ref >= MIN_REF, soft_a, 1.0)

    in_band = np.abs(signed) <= BAND

    # Ngoài ruột: alpha chỉ được phép tăng dần khi đi ra xa mép (không giảm lại), để phần lông
    # trắng của mascot nằm sau nét viền không bị coi là "nền trắng" rồi biến thành trong suốt
    lvl = np.where(signed < 0, np.ceil(-signed), 0).astype(np.int32)
    prop = np.zeros((H, W), np.float32)
    k3 = np.ones((3, 3), np.uint8)
    for L in range(1, BAND + 1):
        m = lvl == L
        neigh = cv2.dilate(prop, k3)
        prop[m] = np.maximum(soft_a[m], neigh[m])
    alpha = np.where(signed >= 0, 0.0, np.where(lvl <= BAND, prop, 1.0))

    # 4. Màu: giữ PNG nơi nó đặc; chỗ mặt nạ cũ đã cắt/làm hỏng thì lấy từ jpg
    rgb = np.where((png_a > 250)[..., None], png_rgb, j2)

    # Bỏ trộn trắng ở dải mép để màu nét vẽ không bị nhạt khi chồng lên ảnh
    a3 = np.clip(alpha, 1e-3, 1.0)[..., None]
    unmixed = np.clip((rgb - 255.0 * (1.0 - a3)) / a3, 0, 255)
    rgb = np.where(in_band[..., None] & (alpha[..., None] < 0.999), unmixed, rgb)

    out = np.zeros((H, W, 4), np.uint8)
    out[:, :, :3] = np.clip(rgb, 0, 255).astype(np.uint8)[:, :, ::-1]  # RGB -> BGR
    out[:, :, 3] = np.clip(alpha * 255.0, 0, 255).astype(np.uint8)
    # Chỉ thay đổi quanh các ô ảnh: phần còn lại giữ nguyên PNG gốc
    changed = np.zeros((H, W), bool)
    for (x, y, sw, sh) in slots:
        X0, Y0 = max(x * SCALE - 60, 0), max(y * SCALE - 60, 0)
        X1, Y1 = min((x + sw) * SCALE + 60, W), min((y + sh) * SCALE + 60, H)
        changed[Y0:Y1, X0:X1] = True
    final = np.where(changed[..., None], out, png)
    cv2.imwrite(os.path.join(DST, f"{name}@2x.png"), final)

    # Bản 1x: thu nhỏ trên ảnh premultiplied để không lem viền
    al = final[:, :, 3:4].astype(np.float32) / 255.0
    pm = np.concatenate([final[:, :, :3].astype(np.float32) * al, al], axis=2)
    small = cv2.resize(pm, (w1, h1), interpolation=cv2.INTER_AREA)
    sa = np.clip(small[:, :, 3:4], 1e-4, 1.0)
    out1 = np.concatenate([np.clip(small[:, :, :3] / sa, 0, 255), small[:, :, 3:4] * 255.0], axis=2).astype(np.uint8)
    cv2.imwrite(os.path.join(DST, f"{name}.png"), out1)

    print(f"{name}: cửa sổ {int(core1.sum())} px (1x), dải mép {int(in_band.sum())} px (2x)")

    if debug_dir:
        bg = np.zeros((H, W, 3), np.float32)
        bg[:] = (255, 0, 255)
        comp = final[:, :, :3] * al + bg * (1 - al)
        cv2.imwrite(os.path.join(debug_dir, f"after_{name}.png"), comp.astype(np.uint8))


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    dbg = sys.argv[1] if len(sys.argv) > 1 else None
    for n, s in FRAMES.items():
        if n in SKIP:
            for f in (f"{n}.png", f"{n}@2x.png"):
                shutil.copy(os.path.join(SRC, f), os.path.join(DST, f))
            print(f"{n}: giữ nguyên bản gốc")
            continue
        clean(n, s, dbg)
