import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pesez Farm Management System",
  description: "Modern agriculture management for Pesez Farms",
};

import Header from "@/components/header";
import Footer from "@/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
