import type { Metadata } from "next";
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

export const metadata = {
title: "Author Market | Buy Books from Independent Authors",
description:
"Author Market is a marketplace for discovering and buying books from independent authors, entrepreneurs, and creators.",
openGraph: {
title: "Author Market",
description:
"Discover and buy books from independent authors on The Author Market.",
url: "https://www.theauthormarket.com",
siteName: "Author Market",
type: "website",
},
twitter: {
card: "summary_large_image",
title: "Author Market",
description:
"Discover and buy books from independent authors on The Author Market.",
},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
