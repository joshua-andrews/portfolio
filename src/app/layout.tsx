import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Josh Andrews | Email Marketer & Klaviyo Expert",
  description:
    "I build email systems so sharp, they should come with a disclaimer. Get emails that cut deep and automations that never sleep.",
  openGraph: {
    title: "Josh Andrews | Email Marketer & Klaviyo Expert",
    description:
      "I build email systems so sharp, they should come with a disclaimer. Get emails that cut deep and automations that never sleep.",
    type: "website",
    url: "https://joshandrewz.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Josh Andrews | Email Marketer & Klaviyo Expert",
    description:
      "I build email systems so sharp, they should come with a disclaimer.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
