import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
    const session = await auth();

    // Fetch summary data
    const eggCount = await prisma.eggsProduction.aggregate({
        _sum: { quantity: true }
    });

    const mortalityCount = await prisma.mortalityRecords.aggregate({
        _sum: { count: true }
    });

    const recentFeed = await prisma.feedStock.findFirst({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">System Overview</h1>
                    <p className="text-gray-500">Welcome back, {session?.user?.name || 'User'}. Here's what's happening today.</p>
                </div>
                <button className="btn-primary">Generate Report</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl">
                {/* Total Eggs Tracked */}
                <div className="bg-gradient-to-br from-white to-green-50/50 p-5 rounded-2xl border border-green-100 shadow-sm border-l-4 border-l-[#2d5a27] transition-all hover:shadow-md cursor-default">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Total Eggs Tracked</p>
                    <h3 className="text-2xl font-black text-[#2d5a27]">{eggCount._sum.quantity || 0}</h3>
                    <p className="text-[10px] text-green-700 mt-2 font-bold flex items-center gap-1">
                        <span className="bg-green-100 px-1.5 py-0.5 rounded">↑ 12%</span>
                        <span className="opacity-60">from last week</span>
                    </p>
                </div>

                {/* Feed Level */}
                <div className="bg-gradient-to-br from-white to-amber-50/50 p-5 rounded-2xl border border-amber-100 shadow-sm border-l-4 border-l-[#e6b41d] transition-all hover:shadow-md cursor-default">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Feed Level (Latest)</p>
                    <h3 className="text-2xl font-black text-amber-700">{recentFeed?.quantity ? `${recentFeed.quantity}kg` : '0 kg'}</h3>
                    <p className="text-[10px] text-amber-700 mt-2 font-bold">
                        <span className="bg-amber-100 px-2 py-0.5 rounded uppercase">{recentFeed?.type || 'Not logged'}</span>
                    </p>
                </div>

                {/* Total Mortality */}
                <div className="bg-gradient-to-br from-white to-red-50/50 p-5 rounded-2xl border border-red-100 shadow-sm border-l-4 border-l-red-500 transition-all hover:shadow-md cursor-default">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Total Mortality</p>
                    <h3 className="text-2xl font-black text-red-700">{mortalityCount._sum.count || 0}</h3>
                    <p className="text-[10px] text-red-600 mt-2 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        Attention required
                    </p>
                </div>

                {/* Active Workers */}
                <div className="bg-gradient-to-br from-white to-orange-50/50 p-5 rounded-2xl border border-orange-100 shadow-sm border-l-4 border-l-[#8b4513] transition-all hover:shadow-md cursor-default">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Active Workers</p>
                    <h3 className="text-2xl font-black text-orange-950">4</h3>
                    <p className="text-[10px] text-orange-800 mt-2 font-bold">
                        <span className="bg-orange-100 px-2 py-0.5 rounded">1 Manager on duty</span>
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass p-8">
                    <h3 className="text-xl font-bold mb-6">Recent Activity Log</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-[#2d5a27]/10 flex items-center justify-center text-xl">🥚</div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold">New egg production record</p>
                                    <p className="text-xs text-gray-400">Worker ID: #WP02 • 2 hours ago</p>
                                </div>
                                <span className="text-sm font-bold text-[#2d5a27]">+$24.00</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass p-8 bg-[#2d5a27] text-white overflow-hidden relative">
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
                        <p className="text-white/70 text-sm mb-8 leading-relaxed">Your farm is performing 15% better than the local industry average this month.</p>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Production Goal</span>
                                    <span className="font-bold">75%</span>
                                </div>
                                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-white w-3/4 rounded-full" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Feed Efficiency</span>
                                    <span className="font-bold">92%</span>
                                </div>
                                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-white w-[92%] rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Visual Flair */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                </div>
            </div>
        </div>
    );
}
