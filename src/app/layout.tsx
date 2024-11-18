import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Public Holidays",
  description: "Quickly find public holidays in your country",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
