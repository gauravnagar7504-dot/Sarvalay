import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sarvalay — India's B2B Art Infrastructure Platform",
  description: "Sarvalay is India's first managed B2B Art Infrastructure Platform delivering wall murals, art installations, and space transformations for hotels, offices, and restaurants across India. AI-powered mockups, verified artists, guaranteed timelines.",
  keywords: ["wall murals India", "commercial art installation", "B2B art platform", "office wall art", "hotel mural", "IVDE mockup engine"],
  openGraph: {
    title: "Sarvalay — India's B2B Art Infrastructure Platform",
    description: "Transform your commercial spaces with curated art and flawless execution. Pan-India reach, verified artists, AI mockups.",
    url: "https://sensational-lamington-eb031e.netlify.app",
    siteName: "Sarvalay",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Poppins:wght@400;500;600&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          <div className="mesh-bg" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

