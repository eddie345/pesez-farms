"use client";

import { useState } from "react";
import Link from "next/link";

export function SidebarToggle({ children, session, mainContent }: { children: React.ReactNode, session: any, mainContent: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#f8faf7] w-full relative overflow-hidden">
            {/* Sidebar Desktop/Mobile */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 glass m-4 mr-0 flex flex-col transition-transform duration-300 lg:static lg:translate-x-0
                ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 shadow-lg lg:shadow-none"}
            `}>
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                        <div className="w-8 h-8 bg-[#2d5a27] rounded-full flex items-center justify-center text-white font-bold text-lg">P</div>
                        <span className="font-bold text-xl text-[#2d5a27]">Pesez Dashboard</span>
                    </Link>
                    <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-400 p-2 hover:bg-gray-100 rounded-lg">✕</button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#2d5a27] text-white font-medium" onClick={() => setIsOpen(false)}>
                        <span>🏠</span> Overview
                    </Link>
                    <Link href="/dashboard/record" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-all font-medium" onClick={() => setIsOpen(false)}>
                        <span>📝</span> Records Entry
                    </Link>
                    <Link href="/dashboard/analytics" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-all font-medium" onClick={() => setIsOpen(false)}>
                        <span>📊</span> Financial Analytics
                    </Link>
                    {session?.user?.role === "ADMIN" && (
                        <Link href="/dashboard/users" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-all font-medium" onClick={() => setIsOpen(false)}>
                            <span>👥</span> User Management
                        </Link>
                    )}

                    <div className="pt-4 mt-4 border-t border-gray-100">
                        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#2d5a27] hover:bg-[#2d5a27]/5 transition-all font-bold group">
                            <span className="transition-transform group-hover:-translate-x-1">⬅️</span> Back to Website
                        </Link>
                    </div>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-4 py-3 bg-white/50 rounded-xl mb-4 border border-gray-100">
                        <div className="w-9 h-9 rounded-full bg-[#2d5a27]/10 flex items-center justify-center text-[#2d5a27] font-bold">
                            {session?.user?.name?.[0] || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-800 truncate">{session?.user?.name || 'User'}</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{session?.user?.role || 'Worker'}</p>
                        </div>
                    </div>
                    {children}
                </div>
            </aside>

            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 lg:hidden animate-fade-in"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 relative">
                {/* Mobile Header Bar */}
                <header className="h-16 flex items-center justify-between px-4 bg-white/80 backdrop-blur-md border-b border-gray-100 lg:px-8 z-30">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="lg:hidden p-2 text-[#2d5a27] hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <span className="text-xl">☰</span>
                        <span className="text-sm font-bold">Menu</span>
                    </button>

                    <h2 className="text-lg font-bold lg:hidden flex items-center gap-2 text-[#2d5a27]">
                        Pesez Farms
                    </h2>

                    <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-400 hidden sm:block font-medium uppercase tracking-tighter">
                            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </span>
                        <button className="relative p-2 text-gray-400 hover:text-[#2d5a27] transition-colors">
                            <span>🔔</span>
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto">
                    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-full">
                        {mainContent}
                    </div>
                </main>
            </div>
        </div>
    );
}
