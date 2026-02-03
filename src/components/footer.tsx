export default function Footer() {
    return (
        <footer className="w-full bg-[#2d5a27] text-white/70 py-12 mt-auto border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#2d5a27] font-bold text-2xl shadow-lg">P</div>
                            <span className="text-2xl font-bold text-white tracking-tight">Pesez Farms</span>
                        </div>
                        <p className="text-base leading-relaxed max-w-sm text-white/80">
                            Driving the future of sustainable poultry farming through precision data and innovative management.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-white font-bold text-lg uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-3 text-sm font-medium">
                            <li><a href="/dashboard" className="hover:text-white transition-colors flex items-center gap-2"><span>→</span> Dashboard</a></li>
                            <li><a href="/dashboard/record" className="hover:text-white transition-colors flex items-center gap-2"><span>→</span> Production</a></li>
                            <li><a href="/dashboard/analytics" className="hover:text-white transition-colors flex items-center gap-2"><span>→</span> Financials</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-white font-bold text-lg uppercase tracking-wider">Support</h4>
                        <p className="text-sm text-white/80 leading-relaxed">Need technical assistance with your farm data?</p>
                        <a href="mailto:support@pesezfarms.com" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#2d5a27] rounded-xl font-bold hover:bg-white/90 transition-all text-sm shadow-md">
                            <span>📧</span> support@pesezfarms.com
                        </a>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 text-center">
                    <p className="text-xs uppercase tracking-[0.3em] font-bold text-white/40">&copy; {new Date().getFullYear()} Pesez Farms & AgriTech. Precision in Agriculture.</p>
                </div>
            </div>
        </footer>
    );
}
