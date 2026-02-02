"use client";

import { useActionState } from "react";
import { register } from "@/lib/auth-actions";
import Link from "next/link";

export default function SignupForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        register,
        undefined,
    );

    return (
        <div className="glass p-8 w-full max-w-md fade-in">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#2d5a27] mb-2">Create Account</h2>
                <p className="text-gray-500 text-sm">Register as a Pesez Farms Administrator</p>
            </div>

            <form action={formAction} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2d5a27]/20 focus:border-[#2d5a27] transition-all"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="admin@pesezfarms.com"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2d5a27]/20 focus:border-[#2d5a27] transition-all"
                    />
                </div>

                <div>
                    <label htmlFor="password" title="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        minLength={6}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2d5a27]/20 focus:border-[#2d5a27] transition-all"
                    />
                </div>

                {errorMessage && (
                    <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100 italic">
                        {errorMessage}
                    </div>
                )}

                <button
                    disabled={isPending}
                    className="w-full btn-primary py-3 flex justify-center items-center gap-2"
                >
                    {isPending ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Creating Account...
                        </>
                    ) : (
                        "Register Administrator"
                    )}
                </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-500">
                <p>Already have an account? <Link href="/login" className="text-[#2d5a27] font-semibold hover:underline">Log in here</Link></p>
                <Link href="/" className="mt-4 inline-block hover:underline">← Back to home</Link>
            </div>

        </div>
    );
}
