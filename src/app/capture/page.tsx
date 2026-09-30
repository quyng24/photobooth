"use client";

import {
  Aperture,
  ArrowLeft,
  Camera,
  CameraOff,
  Heart,
  Lightbulb,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { FilmStripFooter } from "@/components/y2k/FilmStripFooter";
import { Y2kShell } from "@/components/y2k/Y2kShell";
import { Y2kSteps } from "@/components/y2k/Y2kSteps";
import { Y2kWindow } from "@/components/y2k/Y2kWindow";
import { usePhotoStore } from "@/stores/photoStore";
import { imageUrlToDataUrl } from "@/utils/utils";

const POSES = [
  { emoji: "✌️", name: "Peace", hint: "Tay chữ V sát má" },
  { emoji: "💗", name: "Heart", hint: "Tim tay trước ngực" },
  { emoji: "😮", name: "Wow", hint: "Mắt tròn, miệng O" },
  { emoji: "😎", name: "Cool", hint: "Nghiêng đầu, nhìn camera" },
];

const SAMPLE_PHOTOS = [
  "/images/image1.png",
  "/images/image2.png",
  "/images/image3.png",
  "/images/image4.png",
];

type CameraStatus =
  | "loading"
  | "ready"
  | "denied"
  | "unavailable"
  | "error";

export default function CapturePage() {
  const router = useRouter();

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const unmountedRef = useRef(false);

  const [cameraStatus, setCameraStatus] = useState<CameraStatus>("loading");
  const [cameraError, setCameraError] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);
  const [isMockMode, setIsMockMode] = useState(false);
  const [retakeIndex, setRetakeIndex] = useState<number | null>(null);

  const {
    cutMode,
    photos,
    addPhoto,
    replacePhoto,
    clearPhotos,
  } = usePhotoStore();

  const photoCount = cutMode === "2cut" ? 2 : 4;

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const handleCameraError = useCallback((error: unknown) => {
    console.error("Camera error:", error);

    const err = error as DOMException;

    if (
      err?.name === "NotAllowedError" ||
      err?.name === "PermissionDeniedError"
    ) {
      setCameraStatus("denied");
      setCameraError("Bạn chưa cấp quyền sử dụng camera.");
      return;
    }

    if (
      err?.name === "NotFoundError" ||
      err?.name === "DevicesNotFoundError"
    ) {
      setCameraStatus("unavailable");
      setCameraError("Không tìm thấy camera trên thiết bị.");
      return;
    }

    if (
      err?.name === "NotReadableError" ||
      err?.name === "TrackStartError"
    ) {
      setCameraStatus("error");
      setCameraError("Camera đang được sử dụng bởi ứng dụng khác.");
      return;
    }

    setCameraStatus("error");
    setCameraError("Không thể khởi động camera. Vui lòng thử lại.");
  }, []);

  const requestCameraStream = useCallback(async () => {
    stopCamera();

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraStatus("unavailable");
      setCameraError(
        "Trình duyệt hoặc môi trường hiện tại không hỗ trợ camera."
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      if (unmountedRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => { });
      }

      setCameraStatus("ready");
    } catch (error) {
      if (!unmountedRef.current) {
        handleCameraError(error);
      }
    }
  }, [handleCameraError, stopCamera]);

  const startCamera = useCallback(() => {
    setCameraStatus("loading");
    setCameraError("");
    setIsMockMode(false);
    requestCameraStream();
  }, [requestCameraStream]);

  // Initialize camera once mounted
  useEffect(() => {
    unmountedRef.current = false;

    if (!navigator.mediaDevices?.getUserMedia) {
      const t = setTimeout(() => {
        if (!unmountedRef.current) {
          setCameraStatus("unavailable");
          setCameraError(
            "Trình duyệt hoặc môi trường hiện tại không hỗ trợ camera."
          );
        }
      }, 0);
      return () => {
        clearTimeout(t);
        unmountedRef.current = true;
      };
    }

    let active = true;

    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      })
      .then((stream) => {
        if (!active || unmountedRef.current) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => { });
        }

        setCameraStatus("ready");
      })
      .catch((error) => {
        if (active && !unmountedRef.current) {
          handleCameraError(error);
        }
      });

    return () => {
      active = false;
      unmountedRef.current = true;
      stopCamera();
    };
  }, [handleCameraError, stopCamera]);

  // Keep video source synced with stream
  useEffect(() => {
    if (
      videoRef.current &&
      streamRef.current &&
      cameraStatus === "ready" &&
      !isMockMode
    ) {
      if (videoRef.current.srcObject !== streamRef.current) {
        videoRef.current.srcObject = streamRef.current;
        videoRef.current.play().catch(() => { });
      }
    }
  }, [cameraStatus, isMockMode]);

  const enableMockMode = () => {
    stopCamera();
    setIsMockMode(true);
    setCameraStatus("ready");
    setCameraError("");
  };

  const generateMockCanvasPhoto = (): string => {
    const canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    const gradients = [
      ["#ff9a9e", "#fecfef"],
      ["#a1c4fd", "#c2e9fb"],
      ["#ffecd2", "#fcb69f"],
      ["#fbc2eb", "#a6c1ee"],
      ["#84fab0", "#8fd3f4"],
    ];
    const pair = gradients[Math.floor(Math.random() * gradients.length)];
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, pair[0]);
    grad.addColorStop(1, pair[1]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 12;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    ctx.fillStyle = "#000000";
    ctx.font = "bold 64px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("📸 Y2K SNAP ★", canvas.width / 2, canvas.height / 2 - 40);

    ctx.font = "bold 36px monospace";
    ctx.fillText(
      `MOCK PHOTO #${Math.floor(Math.random() * 900 + 100)}`,
      canvas.width / 2,
      canvas.height / 2 + 50
    );

    return canvas.toDataURL("image/jpeg", 0.92);
  };

  const captureCanvasPhoto = useCallback(
    async (photoIndex?: number): Promise<string | null> => {
      if (isMockMode) {
        const sampleIndex =
          typeof photoIndex === "number"
            ? photoIndex % SAMPLE_PHOTOS.length
            : Math.floor(Math.random() * SAMPLE_PHOTOS.length);
        const selectedPhoto = SAMPLE_PHOTOS[sampleIndex];

        try {
          return await imageUrlToDataUrl(selectedPhoto);
        } catch (error) {
          console.warn(
            "Mock photo fetch failed, generating fallback canvas photo:",
            error
          );
          return generateMockCanvasPhoto();
        }
      }

    const video = videoRef.current;

    if (!video) {
      throw new Error("Camera chưa sẵn sàng.");
    }

    if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      throw new Error("Video camera chưa sẵn sàng.");
    }

    const canvas = document.createElement("canvas");
    const targetRatio = 4 / 3;
    const vWidth = video.videoWidth || 640;
    const vHeight = video.videoHeight || 480;
    const videoRatio = vWidth / vHeight;

    let sWidth = vWidth;
    let sHeight = vHeight;
    let sx = 0;
    let sy = 0;

    if (videoRatio > targetRatio) {
      sWidth = vHeight * targetRatio;
      sx = (vWidth - sWidth) / 2;
    } else {
      sHeight = vWidth / targetRatio;
      sy = (vHeight - sHeight) / 2;
    }

    canvas.width = 960;
    canvas.height = 720;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Không thể tạo Canvas context.");
    }

    // Mirror image horizontally to match preview
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    ctx.drawImage(
      video,
      sx,
      sy,
      sWidth,
      sHeight,
      0,
      0,
      canvas.width,
      canvas.height
    );

    return canvas.toDataURL("image/jpeg", 0.92);
  }, [isMockMode]);

  const sleep = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

  const runCountdown = (): Promise<boolean> => {
    return new Promise((resolve) => {
      let count = 3;
      setCountdown(count);

      const interval = setInterval(() => {
        if (unmountedRef.current) {
          clearInterval(interval);
          resolve(false);
          return;
        }

        count -= 1;

        if (count > 0) {
          setCountdown(count);
        } else {
          setCountdown(null);
          clearInterval(interval);
          resolve(true);
        }
      }, 1000);
    });
  };

  const triggerFlash = () => {
    setFlash(true);
    setTimeout(() => {
      if (!unmountedRef.current) {
        setFlash(false);
      }
    }, 200);
  };

  const startPhotoSession = async () => {
    if (cameraStatus !== "ready" || isCapturing) {
      return;
    }

    clearPhotos();
    setIsCapturing(true);
    setRetakeIndex(null);

    try {
      for (let i = 0; i < photoCount; i++) {
        if (unmountedRef.current) break;

        const finished = await runCountdown();
        if (!finished || unmountedRef.current) break;

        const photo = await captureCanvasPhoto(i);
        if (!photo) {
          throw new Error("Không thể tạo ảnh.");
        }

        addPhoto(photo);
        triggerFlash();

        if (i < photoCount - 1) {
          await sleep(1000);
        }
      }
    } catch (error) {
      console.error("Photo session failed:", error);
      if (!unmountedRef.current) {
        setCountdown(null);
        alert(
          error instanceof Error
            ? error.message
            : "Không thể chụp ảnh. Vui lòng thử lại."
        );
      }
    } finally {
      if (!unmountedRef.current) {
        setIsCapturing(false);
        setCountdown(null);
      }
    }
  };

  const startRetake = async (index: number) => {
    if (isCapturing || cameraStatus !== "ready") {
      return;
    }

    if (!photos[index]) {
      return;
    }

    setRetakeIndex(index);
    setIsCapturing(true);

    try {
      const finished = await runCountdown();
      if (!finished || unmountedRef.current) return;

      const newPhoto = await captureCanvasPhoto(index);
      if (!newPhoto) {
        throw new Error("Không thể tạo ảnh mới.");
      }

      replacePhoto(index, newPhoto);
      triggerFlash();
      await sleep(300);
    } catch (error) {
      console.error("Retake failed:", error);
      if (!unmountedRef.current) {
        alert(
          error instanceof Error
            ? error.message
            : "Không thể chụp lại ảnh."
        );
      }
    } finally {
      if (!unmountedRef.current) {
        setCountdown(null);
        setRetakeIndex(null);
        setIsCapturing(false);
      }
    }
  };

  const handleContinue = () => {
    if (photos.length !== photoCount) {
      alert(`Bạn cần chụp đủ ${photoCount} ảnh trước khi tiếp tục.`);
      return;
    }

    stopCamera();
    router.push("/edit");
  };

  const renderCameraState = () => {
    if (isMockMode) {
      return (
        <div className="text-center flex flex-col items-center p-4">
          <CameraOff
            size={48}
            className="mb-3 text-pink-500 opacity-80"
          />

          <span className="font-mono text-sm font-black text-black bg-pink-300 border-2 border-black px-3 py-0.5 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            VM MOCK MODE
          </span>

          <p className="text-xs text-zinc-600 font-bold mt-2">
            Đang mô phỏng camera bằng ảnh mẫu Y2K
          </p>

          <button
            onClick={startCamera}
            className="mt-3 px-3 py-1 bg-cyan-300 hover:bg-cyan-200 border-2 border-black text-black text-xs font-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            Thử lại với Camera thật
          </button>
        </div>
      );
    }

    if (cameraStatus === "loading") {
      return (
        <div className="text-center flex flex-col items-center text-white">
          <RefreshCw size={48} className="mb-4 animate-spin text-pink-400" />
          <p className="font-bold">Đang khởi động camera...</p>
          <p className="text-xs text-zinc-400 mt-2">Vui lòng chờ một chút</p>
        </div>
      );
    }

    if (cameraStatus === "denied") {
      return (
        <div className="text-center flex flex-col items-center px-6">
          <CameraOff size={48} className="mb-4 text-pink-500" />

          <p className="font-black text-white uppercase">
            Cần cấp quyền Camera
          </p>

          <p className="text-sm text-zinc-400 mt-2">{cameraError}</p>

          <p className="text-xs text-zinc-500 mt-2">
            Hãy cho phép Camera trong phần cài đặt của trình duyệt rồi thử lại.
          </p>

          <div className="flex gap-3 mt-5">
            <button
              onClick={startCamera}
              className="px-4 py-2 bg-cyan-300 border-2 border-black text-black font-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-cyan-200 cursor-pointer"
            >
              THỬ LẠI
            </button>

            <button
              onClick={enableMockMode}
              className="px-4 py-2 bg-pink-400 border-2 border-black text-black font-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-pink-300 cursor-pointer"
            >
              DÙNG MOCK
            </button>
          </div>
        </div>
      );
    }

    if (cameraStatus === "unavailable") {
      return (
        <div className="text-center flex flex-col items-center px-6">
          <CameraOff size={48} className="mb-4 text-pink-500" />

          <p className="font-black text-white uppercase">Camera không khả dụng</p>

          <p className="text-sm text-zinc-400 mt-2">{cameraError}</p>

          <button
            onClick={enableMockMode}
            className="mt-5 px-5 py-2 bg-pink-400 border-2 border-black text-black font-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-pink-300 cursor-pointer"
          >
            CHUYỂN SANG MOCK MODE
          </button>
        </div>
      );
    }

    if (cameraStatus === "error") {
      return (
        <div className="text-center flex flex-col items-center px-6">
          <CameraOff size={48} className="mb-4 text-red-400" />

          <p className="font-black text-white uppercase">Lỗi Camera</p>

          <p className="text-sm text-zinc-400 mt-2">{cameraError}</p>

          <div className="flex gap-3 mt-5">
            <button
              onClick={startCamera}
              className="px-4 py-2 bg-cyan-300 border-2 border-black text-black font-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-cyan-200 cursor-pointer"
            >
              THỬ LẠI
            </button>

            <button
              onClick={enableMockMode}
              className="px-4 py-2 bg-pink-400 border-2 border-black text-black font-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-pink-300 cursor-pointer"
            >
              DÙNG MOCK
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  const slotItems = Array.from({ length: photoCount }, (_, index) => photos[index] ?? null);

  return (
    <Y2kShell showStickers>
      {flash && (
        <div className="fixed inset-0 z-100 bg-white pointer-events-none" />
      )}

      <div className="mx-auto flex w-full max-w-6xl shrink-0 items-center justify-between gap-3 px-4 pt-2">
        <Link
          href="/setup"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border-2 border-black bg-white px-3 py-1.5 text-xs font-extrabold shadow-[3px_3px_0px_0px_#000] hover:bg-yellow-300"
        >
          <ArrowLeft size={14} />
          CHỌN KHUNG
        </Link>
        <Y2kSteps current={2} />
        <div className="hidden rounded-xl border-2 border-black bg-cyan-300 px-3 py-1.5 text-xs font-black uppercase shadow-[3px_3px_0px_0px_#000] sm:block">
          {cutMode === "2cut" ? "2-CUT" : "4-CUT"}
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-start gap-4 px-4 py-3 lg:grid-cols-[minmax(0,1fr)_280px]">
        <Y2kWindow
          title="CAPTURE_STUDIO.EXE"
          badge={
            <span className="text-[10px] font-mono font-bold text-yellow-300">
              CAM {photos.length}/{photoCount}
            </span>
          }
          bodyClassName="flex flex-col items-center bg-[#fffbe6] p-4 sm:p-5"
        >
          <div className="mb-2 flex w-full items-end justify-between px-1">
            <div>
              <h1 className="flex items-center gap-2 text-xl font-black tracking-tight uppercase">
                SAY CHEESE!
                <Sparkles className="text-yellow-400" size={18} fill="currentColor" />
              </h1>
              <p className="text-xs font-bold text-gray-600">
                {photos.length === photoCount
                  ? "Sẵn sàng decor — hoặc retake."
                  : `Tạo dáng (${photos.length}/${photoCount})`}
              </p>
            </div>
            <div className="rotate-3 rounded-full border-2 border-black bg-pink-400 px-3 py-0.5 text-sm font-black text-white shadow-[3px_3px_0px_0px_#000]">
              {photos.length} / {photoCount}
            </div>
          </div>

          <div className="relative mb-3 flex w-full max-w-xl mx-auto items-center justify-center overflow-hidden rounded-2xl border-4 border-black bg-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] aspect-4/3">
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20 z-20">
              <div
                className={`w-3 h-3 rounded-full ${
                  isCapturing
                    ? "bg-red-500 animate-pulse"
                    : cameraStatus === "ready"
                      ? "bg-green-400"
                      : "bg-gray-400"
                }`}
              />
              <span className="text-white text-xs font-bold font-mono tracking-wider">
                {isCapturing
                  ? "REC"
                  : cameraStatus === "ready"
                    ? isMockMode
                      ? "MOCK"
                      : "READY"
                    : "STBY"}
              </span>
            </div>

            <div className="absolute inset-4 border-2 border-white/30 pointer-events-none z-10">
              <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-white" />
              <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-white" />
              <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-white" />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-white" />
            </div>

            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover scale-x-[-1] z-0 ${
                cameraStatus === "ready" && !isMockMode ? "block" : "hidden"
              }`}
            />

            {isMockMode && <div className="absolute inset-0 bg-zinc-900 z-0" />}

            {(cameraStatus !== "ready" || isMockMode) && (
              <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/70 backdrop-blur-xs">
                {renderCameraState()}
              </div>
            )}

            {countdown !== null && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] z-30">
                <span
                  className="text-[140px] font-black text-yellow-400 animate-bounce drop-shadow-[8px_8px_0px_rgba(0,0,0,1)] select-none"
                  style={{ WebkitTextStroke: "4px black" }}
                >
                  {countdown}
                </span>
              </div>
            )}
          </div>

          <div className="w-full mb-5">
            <div className="flex items-center justify-between mb-3 px-1">
              <p className="text-sm font-black uppercase text-black">
                Film strip ({photos.length}/{photoCount})
              </p>
              <span className="text-xs font-bold text-zinc-500">
                Slot trống = chưa chụp
              </span>
            </div>

            <div className={`grid ${photoCount === 2 ? "grid-cols-2" : "grid-cols-4"} gap-2`}>
              {slotItems.map((photo, index) => (
                <div
                  key={photo ? `${index}-${photo.slice(0, 32)}` : `empty-${index}`}
                  className="relative group rounded-xl border-2 border-black overflow-hidden bg-white shadow-[3px_3px_0px_0px_#000] min-h-16"
                >
                  {photo ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        className="w-full aspect-4/3 object-cover block"
                      />
                      <div className="absolute top-1 left-1 bg-black text-white text-[10px] font-black px-1.5 py-0.5 rounded">
                        0{index + 1}
                      </div>
                      <button
                        onClick={() => startRetake(index)}
                        disabled={isCapturing}
                        className={`absolute inset-x-1 bottom-1 py-1 bg-pink-400 hover:bg-pink-300 border-2 border-black text-black text-[10px] font-black rounded shadow-sm transition-all cursor-pointer ${
                          retakeIndex === index
                            ? "opacity-100 bg-yellow-300"
                            : "opacity-90 sm:opacity-0 sm:group-hover:opacity-100 disabled:opacity-40"
                        }`}
                      >
                        {retakeIndex === index ? "ĐANG CHỤP..." : "RETAKE"}
                      </button>
                    </>
                  ) : (
                    <div className="aspect-4/3 flex flex-col items-center justify-center bg-pink-50 border-dashed">
                      <span className="font-mono text-[10px] font-black text-zinc-400">
                        0{index + 1}
                      </span>
                      <span className="text-[9px] font-bold text-zinc-400 uppercase">
                        waiting
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full flex flex-col items-center gap-4 mt-1">
            {isCapturing ? (
              <div className="h-20 flex flex-col items-center justify-center animate-pulse text-pink-500 font-bold">
                <Aperture size={36} className="animate-spin mb-2" />
                <span className="text-sm font-black uppercase tracking-wider text-black">
                  {retakeIndex !== null
                    ? `Đang chụp lại ảnh #${retakeIndex + 1}...`
                    : `Đang chụp ảnh ${photos.length + 1} / ${photoCount}...`}
                </span>
              </div>
            ) : photos.length < photoCount ? (
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={startPhotoSession}
                  disabled={cameraStatus !== "ready"}
                  aria-label="Chụp ảnh"
                  className="relative flex items-center justify-center w-20 h-20 bg-pink-500 text-black border-4 border-black rounded-full shadow-[6px_6px_0px_0px_#000] hover:bg-pink-400 disabled:bg-zinc-300 disabled:cursor-not-allowed disabled:shadow-none active:translate-y-1.5 active:translate-x-1.5 active:shadow-none transition-all outline-none group cursor-pointer"
                >
                  <Camera
                    size={36}
                    fill="currentColor"
                    className="text-white drop-shadow-md group-hover:scale-110 transition-transform"
                  />
                </button>
                <span className="text-xs font-black uppercase tracking-wider text-zinc-600">
                  Bấm để bắt đầu chụp ({photoCount} ảnh)
                </span>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-3">
                <button
                  onClick={handleContinue}
                  className="w-full py-4 bg-cyan-300 border-4 border-black rounded-xl font-black text-black text-lg shadow-[6px_6px_0px_0px_#000] hover:bg-cyan-200 hover:translate-y-0.5 hover:translate-x-0.5 active:translate-y-1.5 active:translate-x-1.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  HOÀN THÀNH → CHỈNH SỬA
                  <Sparkles size={20} className="text-pink-600" />
                </button>
                <div className="flex items-center justify-between text-xs font-bold text-zinc-500 px-1">
                  <span>Retake từng ô ở film strip</span>
                  <button
                    onClick={() => clearPhotos()}
                    className="text-pink-600 hover:underline font-black cursor-pointer"
                  >
                    Chụp lại tất cả
                  </button>
                </div>
              </div>
            )}
          </div>
        </Y2kWindow>

        <aside className="flex flex-col gap-3">
          <div className="bg-white border-3 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_#000]">
            <div className="flex items-center gap-2 mb-2">
              <Heart size={16} className="text-pink-500 fill-pink-500" />
              <p className="font-black text-xs uppercase">Pose card</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {POSES.map((pose) => (
                <div
                  key={pose.name}
                  className="border-2 border-black rounded-xl bg-pink-50 p-2 text-center"
                >
                  <p className="text-lg leading-none">{pose.emoji}</p>
                  <p className="font-black text-[10px] uppercase mt-1">{pose.name}</p>
                  <p className="text-[9px] font-semibold text-zinc-500">{pose.hint}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-300 border-3 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_#000]">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb size={16} />
              <p className="font-black text-xs uppercase">Booth tips</p>
            </div>
            <ul className="text-[11px] font-bold space-y-1.5 leading-snug">
              <li>• Nâng máy ngang mắt, không chụp từ dưới cằm.</li>
              <li>• Đếm 3-2-1 rồi giữ dáng thêm 0.5s.</li>
              <li>• Đổi pose mỗi shot để strip sống động.</li>
            </ul>
          </div>

          <div className="bg-black text-white border-3 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_#ff69b4]">
            <p className="font-mono text-[10px] text-cyan-300 font-bold">STATUS.LOG</p>
            <p className="font-black text-sm mt-1 uppercase">
              {isMockMode ? "Mock cam ON" : cameraStatus === "ready" ? "Live cam ON" : "Cam standby"}
            </p>
            <p className="text-[11px] font-semibold text-zinc-300 mt-1">
              Khung {cutMode === "2cut" ? "2" : "4"} cut • flash khi chụp
            </p>
          </div>
        </aside>
      </div>

      <div className="w-full max-w-6xl mt-6">
        <FilmStripFooter text="3 • 2 • 1 • FLASH • Y2K SNAP" />
      </div>
    </Y2kShell>
  );
}