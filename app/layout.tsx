import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono} from "next/font/google";
import LightRays from "@/components/LightRays"
import "./globals.css";
import NavBar from "@/components/NavBar";
import { PostHogProvider } from '@/providers'

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted_grotesk", });

const martianMono = Martian_Mono({variable: "--font-martian-mono", });

export const metadata: Metadata = {
  title: "Dev Events",
  description: "The best dev events around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${schibstedGrotesk.variable} ${martianMono.variable} min-h-screen antialiased` }
      >
      <PostHogProvider>
          <NavBar />
              <div className="absolute insert-0 top-0 z-[-1] min-h-screen">
                  <LightRays
                      raysOrigin="top-center-offset"
                      raysColor="#5dfeca"
                      raysSpeed={0.5}
                      lightSpread={0.9}
                      rayLength={1.4}
                      followMouse={true}
                      mouseInfluence={0.02}
                      noiseAmount={0.0}
                      distortion={0.01}
                  />
              </div>

          <main>
              {children}
          </main>

      </PostHogProvider>
      </body>
    </html>
  );
}
