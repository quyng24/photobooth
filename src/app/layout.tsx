import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ec4899",
  colorScheme: "light",
};

export const metadata: Metadata = {
  title: {
    default: "Y2K Snapbooth | Chụp ảnh 4-cut phong cách Y2K",
    template: "%s | Y2K Snapbooth",
  },
  description:
    "Trải nghiệm chụp ảnh photobooth 4-cut chuẩn phong cách Hàn Quốc và Y2K ngay trên trình duyệt. Thêm khung, áp filter, dán sticker và tải ảnh HD hoàn toàn miễn phí. Không cần tải app!",
  keywords: [
    "photobooth online",
    "chụp ảnh 4 cut",
    "life4cut online",
    "y2k photobooth",
    "chụp ảnh phong cách hàn quốc",
    "web chụp ảnh lấy ngay",
    "photo strip maker",
    "y2k aesthetic",
    "snapbooth",
    "free photobooth"
  ],
  authors: [{ name: "Quicy Nguyen", url: "https://portfolio-quicy.vercel.app" }],
  creator: "Quicy Nguyen",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://y2k-snapbooth.vercel.app",
    title: "Y2K Snapbooth | Chụp ảnh 4-cut phong cách Y2K",
    description: "Chụp ảnh photobooth 4-cut chuẩn Hàn Quốc ngay trên trình duyệt. Miễn phí, không cần cài app!",
    siteName: "Y2K Snapbooth",
    images: [
      {
        url: "/logo_y2k_og.jpg",
        width: 1200,
        height: 630,
        alt: "Y2K Snapbooth - Online 4-cut Photo Strip Maker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Y2K Snapbooth | Chụp ảnh 4-cut phong cách Y2K",
    description: "Tạo dải ảnh 4-cut chuẩn Hàn Quốc ngay trên web cực mượt!",
    images: ["/logo_y2k_og.jpg"],
  },
  appleWebApp: {
    capable: true,
    title: "Snapbooth",
    statusBarStyle: "black-translucent",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
