import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AnalyticsPage() {
    const session = await auth();
    if (!session) redirect("/login");

    const [eggSales, feedStock, eggsProduction] = await Promise.all([
        (prisma as any).eggSales.findMany({ orderBy: { date: "desc" } }),
        prisma.feedStock.findMany({ orderBy: { date: "desc" } }),
        prisma.eggsProduction.findMany({ orderBy: { date: "desc" } }),
    ]);

    const totalRevenue = eggSales.reduce((sum: number, sale: any) => sum + sale.amount, 0);
    const totalFeedCost = feedStock.reduce((sum: number, feed: any) => sum + (feed.cost || 0), 0);
    const totalProduction = eggsProduction.reduce((sum: number, prod: any) => sum + prod.quantity, 0);
    const totalSalesQuantity = eggSales.reduce((sum: number, sale: any) => sum + sale.quantity, 0);
    const netProfit = totalRevenue - totalFeedCost;

    const isProfitable = netProfit >= 0;

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-[#2d5a27] mb-2">Financial Analytics</h1>
                <p className="text-gray-500">Overview of your farm's economic performance and production trends.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="glass p-6 text-center">
                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Total Revenue</p>
                    <p className="text-3xl font-bold text-[#2d5a27]">GHC {totalRevenue.toLocaleString()}</p>
                </div>
                <div className="glass p-6 text-center">
                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Total Costs (Feed)</p>
                    <p className="text-3xl font-bold text-red-600">GHC {totalFeedCost.toLocaleString()}</p>
                </div>
                <div className="glass p-6 text-center col-span-1 md:col-span-2 lg:col-span-1">
                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Net Profit/Loss</p>
                    <p className={`text-3xl font-bold ${isProfitable ? "text-green-600" : "text-red-600"}`}>
                        GHC {Math.abs(netProfit).toLocaleString()}
                        <span className="text-sm ml-2 font-medium opacity-70">
                            ({isProfitable ? "Profit" : "Loss"})
                        </span>
                    </p>
                </div>
                <div className="glass p-6 text-center">
                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Production (Eggs)</p>
                    <p className="text-3xl font-bold text-blue-600">{totalProduction.toLocaleString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass p-8 overflow-hidden">
                    <h3 className="text-xl font-bold text-[#2d5a27] mb-6">Recent Sales</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100 text-gray-400 text-sm">
                                    <th className="pb-4 font-medium uppercase">Date</th>
                                    <th className="pb-4 font-medium uppercase text-right">Qty</th>
                                    <th className="pb-4 font-medium uppercase text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-sm">
                                {eggSales.slice(0, 10).map((sale: any) => (
                                    <tr key={sale.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4">{new Date(sale.date).toLocaleDateString()}</td>
                                        <td className="py-4 text-right">{sale.quantity}</td>
                                        <td className="py-4 text-right font-medium">GHC {sale.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="glass p-8 overflow-hidden">
                    <h3 className="text-xl font-bold text-[#2d5a27] mb-6">Feed Expenses</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100 text-gray-400 text-sm">
                                    <th className="pb-4 font-medium uppercase">Date</th>
                                    <th className="pb-4 font-medium uppercase">Type</th>
                                    <th className="pb-4 font-medium uppercase text-right">Cost</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-sm">
                                {feedStock.slice(0, 10).map((feed: any) => (
                                    <tr key={feed.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4">{new Date(feed.date).toLocaleDateString()}</td>
                                        <td className="py-4 capitalize">{feed.type}</td>
                                        <td className="py-4 text-right font-medium">GHC {feed.cost}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
