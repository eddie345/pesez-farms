export default function Footer() {
    return (
        <footer className="w-full bg-[#1a3317] text-white/60 py-12 mt-auto border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white font-bold text-lg">P</div>
                            <span className="text-xl font-bold text-white tracking-tight">Pesez Farms</span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-xs">
                            Empowering modern agriculture with precise monitoring and data-driven management solutions.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-white font-semibold text-lg">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/dashboard" className="hover:text-white transition-colors">Management Dashboard</a></li>
                            <li><a href="/dashboard/record" className="hover:text-white transition-colors">Production Logs</a></li>
                            <li><a href="/dashboard/analytics" className="hover:text-white transition-colors">Financial Analysis</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-white font-semibold text-lg">Contact Support</h4>
                        <p className="text-sm">Need help? Reach out to our technical team.</p>
                        <a href="mailto:support@pesezfarms.com" className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors text-sm">
                            support@pesezfarms.com
                        </a>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 text-center text-xs uppercase tracking-[0.2em]">
                    <p>&copy; {new Date().getFullYear()} Pesez Farms & AgriTech Solutions. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
