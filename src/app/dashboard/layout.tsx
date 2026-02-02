import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <div className="flex h-screen bg-[#f8faf7]">
            {/* Sidebar */}
            <aside className="w-64 glass m-4 mr-0 hidden lg:flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#2d5a27] rounded-full flex items-center justify-center text-white font-bold text-lg">P</div>
                        <span className="font-bold text-xl text-[#2d5a27]">Pesez Dashboard</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#2d5a27] text-white font-medium">
                        <span>🏠</span> Overview
                    </Link>
                    <Link href="/dashboard/eggs" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-all font-medium">
                        <span>🥚</span> Egg Production
                    </Link>
                    <Link href="/dashboard/feed" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-all font-medium">
                        <span>🌾</span> Feed Stock
                    </Link>
                    <Link href="/dashboard/mortality" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-all font-medium">
                        <span>📉</span> Mortality Records
                    </Link>
                    {session?.user?.role === "ADMIN" && (
                        <Link href="/dashboard/users" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-all font-medium">
                            <span>👥</span> User Management
                        </Link>
                    )}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl mb-4">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                            {session?.user?.name?.[0] || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">{session?.user?.name || 'User'}</p>
                            <p className="text-xs text-gray-400 capitalize">{session?.user?.role || 'Worker'}</p>
                        </div>
                    </div>
                    <form
                        action={async () => {
                            "use server";
                            await signOut({ redirectTo: "/" });
                        }}
                    >
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-xl transition-all">
                            <span>🚪</span> Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top bar */}
                <header className="h-16 flex items-center justify-between px-8 bg-white/50 backdrop-blur-sm border-b border-gray-100">
                    <h2 className="text-lg font-semibold lg:hidden flex items-center gap-2">
                        <div className="w-6 h-6 bg-[#2d5a27] rounded-full flex items-center justify-center text-white font-bold text-xs italic">P</div>
                        Pesez Farms
                    </h2>
                    <div className="flex items-center gap-4 ml-auto">
                        <span className="text-sm text-gray-500 hidden sm:block">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <button className="glass p-2">🔔</button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
