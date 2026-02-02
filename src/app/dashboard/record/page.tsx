import { EggProductionForm, EggSalesForm, FeedUsageForm } from "@/components/record-forms";

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
                    <EggProductionForm />
                </div>

                {/* Egg Sales Form */}
                <div className="glass p-8 space-y-6">
                    <h3 className="text-2xl font-semibold text-[#2d5a27]">Egg Sales</h3>
                    <EggSalesForm />
                </div>

                {/* Feed Usage Form */}
                <div className="glass p-8 space-y-6 lg:col-span-2">
                    <h3 className="text-2xl font-semibold text-[#2d5a27]">Feed Usage & Purchase</h3>
                    <FeedUsageForm />
                </div>
            </div>
        </div>
    );
}
