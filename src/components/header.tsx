"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-[#2d5a27]/90 backdrop-blur-md border-b border-[#2d5a27]/20 shadow-sm">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#2d5a27] font-bold text-xl shadow-lg transition-transform group-hover:scale-110">
                        P
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white">Pesez Farms</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 text-white/90 font-medium">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                    <Link href="/dashboard/record" className="hover:text-white transition-colors">Records</Link>
                    <Link href="/dashboard/analytics" className="hover:text-white transition-colors">Analytics</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="hidden md:block px-6 py-2.5 bg-white text-[#2d5a27] font-semibold rounded-xl hover:bg-white/90 transition-all shadow-md active:scale-95"
                    >
                        Sign Out
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-white p-2"
                    >
                        {isMenuOpen ? "✕" : "☰"}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="md:hidden bg-[#2d5a27] border-t border-white/10 p-6 flex flex-col gap-4 fade-in">
                    <Link href="/" className="text-white font-medium py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link href="/dashboard" className="text-white font-medium py-2" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                    <Link href="/dashboard/record" className="text-white font-medium py-2" onClick={() => setIsMenuOpen(false)}>Records</Link>
                    <Link href="/dashboard/analytics" className="text-white font-medium py-2" onClick={() => setIsMenuOpen(false)}>Analytics</Link>
                    <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="w-full mt-2 px-6 py-3 bg-white text-[#2d5a27] font-semibold rounded-xl"
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </header>
    );
}
