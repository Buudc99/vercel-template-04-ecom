import type {Metadata} from "next";
import {Inter, Space_Grotesk} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {ClientProvider, MainLayout} from "@/layouts";
import {StrictMode, Suspense} from "react";

const inter = Inter({subsets: ["latin"]});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "iPrice",
  description:
    "Track product prices effortlessly and save money on your online shopping.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <StrictMode>
      <html lang="en">
        <body className={inter.className}>
          <Suspense fallback={<></>}>
            <ClientProvider>
              <div className="max-w-10xl mx-auto">
                <MainLayout>
                  <Navbar />
                  {children}
                </MainLayout>
              </div>
            </ClientProvider>
          </Suspense>
        </body>
      </html>
    </StrictMode>
  );
}
