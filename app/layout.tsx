import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { InlineScript } from "./components/InlineScript";
import { themeInitScript } from "./components/theme";
import { ThemeToggle } from "./components/ThemeToggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "University Department Curriculum Project",
  description: "Next with Prisma data entities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <InlineScript html={themeInitScript} />
      </head>
      <body className="min-h-full flex flex-col">
        <header className="flex justify-end px-8 pt-4">
          <ThemeToggle />
        </header>
        {children}
      </body>
    </html>
  );
}
