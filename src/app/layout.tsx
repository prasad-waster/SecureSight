import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SecureSight Dashboard",
  description: "CCTV monitoring software with incident detection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    // SecureSight brand colors
                    primary: '#FF6B35',
                    danger: '#FF4757',
                    warning: '#FFA502', 
                    success: '#2ED573',
                    info: '#3742FA',
                    dark: {
                      900: '#0F0F0F',
                      800: '#1A1A1A', 
                      700: '#2D2D2D',
                      600: '#404040'
                    }
                  },
                  fontFamily: {
                    sans: ['Inter', 'system-ui', 'sans-serif']
                  }
                }
              }
            }
          `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-gray-950 min-h-screen`}>
        <Navbar />
        <main className="container mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
