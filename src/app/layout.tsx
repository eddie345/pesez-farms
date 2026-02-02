import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pesez Farm Management System",
  description: "Modern agriculture management for Pesez Farms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
