import { recordEggProduction, recordEggSales, recordFeedUsage } from "@/lib/record-actions";

export default function RecordsPage() {
    return (
        <div className="container mx-auto px-6 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-[#2d5a27] mb-2">Farm Records</h1>
                <p className="text-gray-500">Log daily production and expenses to maintain your farm's health.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Egg Collection Form */}
                <div className="glass p-8 space-y-6">
                    <h3 className="text-2xl font-semibold text-[#2d5a27]">Egg Collection</h3>
                    <form action={recordEggProduction} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (Pieces)</label>
                            <input name="quantity" type="number" required className="w-full px-4 py-2.5 rounded-xl border border-gray-200" placeholder="e.g. 150" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input name="date" type="date" className="w-full px-4 py-2.5 rounded-xl border border-gray-200" />
                        </div>
                        <button type="submit" className="w-full btn-primary py-3">Record Production</button>
                    </form>
                </div>

                {/* Egg Sales Form */}
                <div className="glass p-8 space-y-6">
                    <h3 className="text-2xl font-semibold text-[#2d5a27]">Egg Sales</h3>
                    <form action={recordEggSales} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (Crates/Pieces)</label>
                                <input name="quantity" type="number" required className="w-full px-4 py-2.5 rounded-xl border border-gray-200" placeholder="50" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (GHC)</label>
                                <input name="amount" type="number" step="0.01" required className="w-full px-4 py-2.5 rounded-xl border border-gray-200" placeholder="1200.00" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input name="date" type="date" className="w-full px-4 py-2.5 rounded-xl border border-gray-200" />
                        </div>
                        <button type="submit" className="w-full bg-[#2d5a27] text-white py-3 rounded-xl font-semibold hover:bg-[#1a3317] transition-all">Record Sales</button>
                    </form>
                </div>

                {/* Feed Usage Form */}
                <div className="glass p-8 space-y-6 lg:col-span-2">
                    <h3 className="text-2xl font-semibold text-[#2d5a27]">Feed Usage & Purchase</h3>
                    <form action={recordFeedUsage} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Feed Type</label>
                            <select name="type" required className="w-full px-4 py-2.5 rounded-xl border border-gray-200">
                                <option value="starter">Starter Mash</option>
                                <option value="grower">Grower Mash</option>
                                <option value="layer">Layer Mash</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (Bags/kg)</label>
                            <input name="quantity" type="number" step="0.1" required className="w-full px-4 py-2.5 rounded-xl border border-gray-200" placeholder="10.5" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cost (GHC)</label>
                            <input name="cost" type="number" step="0.01" required className="w-full px-4 py-2.5 rounded-xl border border-gray-200" placeholder="450.00" />
                        </div>
                        <div className="flex items-end">
                            <button type="submit" className="w-full btn-primary py-2.5">Record Feed</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
