"use client";

import { useActionState, useEffect } from "react";
import { recordEggProduction, recordEggSales, recordFeedUsage, recordMortality } from "@/lib/record-actions";

function FormFeedback({ state }: { state: any }) {
    if (!state) return null;
    if (state.error) {
        return <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100 italic">{state.error}</div>;
    }
    if (state.success) {
        return <div className="p-3 bg-green-50 text-green-600 text-xs rounded-lg border border-green-100 italic">Record saved successfully!</div>;
    }
    return null;
}

export function EggProductionForm() {
    const [state, formAction, isPending] = useActionState(recordEggProduction, null);
    return (
        <form action={formAction} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (Pieces)</label>
                <input name="quantity" type="number" required className="w-full px-4 py-2.5 rounded-xl border border-gray-200" placeholder="e.g. 150" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input name="date" type="date" className="w-full px-4 py-2.5 rounded-xl border border-gray-200" />
            </div>
            <FormFeedback state={state} />
            <button type="submit" disabled={isPending} className="w-full btn-primary py-3">
                {isPending ? "Saving..." : "Record Production"}
            </button>
        </form>
    );
}

export function EggSalesForm() {
    const [state, formAction, isPending] = useActionState(recordEggSales, null);
    return (
        <form action={formAction} className="space-y-4">
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
            <FormFeedback state={state} />
            <button type="submit" disabled={isPending} className="w-full bg-[#2d5a27] text-white py-3 rounded-xl font-semibold hover:bg-[#1a3317] transition-all">
                {isPending ? "Saving..." : "Record Sales"}
            </button>
        </form>
    );
}

export function FeedUsageForm() {
    const [state, formAction, isPending] = useActionState(recordFeedUsage, null);
    return (
        <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <div className="flex flex-col justify-end gap-2">
                <FormFeedback state={state} />
                <button type="submit" disabled={isPending} className="w-full btn-primary py-2.5">
                    {isPending ? "Saving..." : "Record Feed"}
                </button>
            </div>
        </form>
    );
}

export function MortalityRecordForm() {
    const [state, formAction, isPending] = useActionState(recordMortality, null);
    return (
        <form action={formAction} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Death Count</label>
                    <input name="count" type="number" required className="w-full px-4 py-2.5 rounded-xl border border-gray-200" placeholder="0" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input name="date" type="date" className="w-full px-4 py-2.5 rounded-xl border border-gray-200" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cause (Optional)</label>
                <input name="cause" type="text" className="w-full px-4 py-2.5 rounded-xl border border-gray-200" placeholder="e.g. Heat stress, Disease" />
            </div>
            <FormFeedback state={state} />
            <button type="submit" disabled={isPending} className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-all">
                {isPending ? "Saving..." : "Record Mortality"}
            </button>
        </form>
    );
}
