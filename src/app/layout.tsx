import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mohamedfaisal.dev"),
  title: "Mohamed Faisal | Full Stack Developer & Software Engineer",
  description: "Explore the personal portfolio of Mohamed Faisal, a software engineer specialized in building premium, high-performance web applications using React, Next.js, TypeScript, and Node.js.",
  keywords: ["Mohamed Faisal", "Software Engineer", "Full Stack Developer", "Web Developer", "Next.js", "React Portfolio", "Creative Developer"],
  authors: [{ name: "Mohamed Faisal" }],
  openGraph: {
    title: "Mohamed Faisal | Full Stack Developer & Software Engineer",
    description: "Personal portfolio showcasing premium digital solutions, real-time web applications, and interactive frontend designs.",
    url: "https://mohamedfaisal.dev",
    siteName: "Mohamed Faisal Portfolio",
    images: [
      {
        url: "/images/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Mohamed Faisal Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Faisal | Full Stack Developer & Software Engineer",
    description: "Personal portfolio showcasing premium digital solutions, real-time web applications, and interactive frontend designs.",
    images: ["/images/portfolio.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mohamed Faisal",
    "jobTitle": "Software Engineer & Full Stack Developer",
    "url": "https://mohamedfaisal.dev",
    "sameAs": [
      "https://github.com",
      "https://linkedin.com"
    ],
    "knowsAbout": [
      "Software Engineering",
      "Web Development",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Supabase",
      "Three.js"
    ]
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
