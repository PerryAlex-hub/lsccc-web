import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteLayout } from "@/components/site/layout";
import "./globals.css";

const jakartaSans = localFont({
  src: "./fonts/PlusJakartaSans-Variable.ttf",
  variable: "--font-jakarta-sans",
  weight: "200 800",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lagos State Command & Control Centre",
    template: "%s | Lagos State Command & Control Centre",
  },
  description:
    "Coordinating emergency response. Serving the people of Lagos. Learn about the centre, emergency services and public safety resources.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
