import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="bg-mesh" />

      {/* Navigation */}
      <nav className="glass-nav px-6 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#2d5a27] rounded-full flex items-center justify-center text-white font-bold text-xl">P</div>
            <span className="text-2xl font-bold tracking-tight text-[#2d5a27]">Pesez Farms</span>
          </div>
          <div className="hidden md:flex gap-8 items-center text-sm font-medium">
            <Link href="#features" className="hover:text-[#2d5a27] transition-colors">Features</Link>
            <Link href="#about" className="hover:text-[#2d5a27] transition-colors">About</Link>
            <Link href="/login" className="btn-secondary">Portal Login</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="px-6 lg:px-12 pt-20 pb-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <h1 className="text-5xl lg:text-7xl font-bold text-[#1c1c1c] leading-[1.1] mb-6">
              Modern Farm <br />
              <span className="text-[#2d5a27]">Management</span> <br />
              Made Simple.
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
              Automate your poultry data tracking. From egg production to feed stock and mortality records, Pesez Farms provides real-time insights for better decision making.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/login" className="btn-primary text-center min-w-[160px]">
                Enter Dashboard
              </Link>
              <Link href="#features" className="btn-secondary text-center min-w-[160px]">
                Explore Features
              </Link>
            </div>
          </div>

          <div className="fade-in delay-1 relative">
            <div className="glass p-8 aspect-video flex flex-col justify-center items-center text-center overflow-hidden">
              {/* Visual Placeholder for premium feel */}
              <div className="w-full h-full rounded-lg bg-gradient-to-br from-[#2d5a27] to-[#e6b41d] opacity-20 absolute top-0 left-0" />
              <div className="relative z-10">
                <div className="text-6xl mb-4">🚜</div>
                <h2 className="text-2xl font-bold text-[#2d5a27] mb-2">Smart Tracking</h2>
                <p className="text-gray-600">Real-time data at your fingertips</p>
              </div>
            </div>
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 glass p-4 fade-in delay-2 hidden sm:block">
              <div className="text-[#2d5a27] font-bold text-xl">99.8%</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">Efficiency Rate</div>
            </div>
            <div className="absolute -top-6 -right-6 glass p-4 fade-in delay-3 hidden sm:block">
              <div className="text-[#e6b41d] font-bold text-xl">2.4k+</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">Daily Records</div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="px-6 lg:px-12 py-24 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1c1c1c] mb-4">Core Management Tools</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to manage your poultry farm operations in one integrated platform.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass p-8 hover:scale-[1.02] transition-transform duration-300">
              <div className="text-4xl mb-6">🥚</div>
              <h3 className="text-xl font-bold mb-3">Egg Production</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Detailed logging of egg collections per flock with automated daily and weekly summaries.</p>
            </div>

            <div className="glass p-8 hover:scale-[1.02] transition-transform duration-300">
              <div className="text-4xl mb-6">🌾</div>
              <h3 className="text-xl font-bold mb-3">Feed Stock</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Inventory management for feed supply. Tracks consumption rates and predicts restock dates.</p>
            </div>

            <div className="glass p-8 hover:scale-[1.02] transition-transform duration-300">
              <div className="text-4xl mb-6">📉</div>
              <h3 className="text-xl font-bold mb-3">Mortality Records</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Quick logging for mortality events with cause analysis to help prevent flock loss.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-12 py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white font-bold">P</div>
            <span className="font-semibold text-gray-800 tracking-tight">Pesez Farms</span>
          </div>
          <div className="text-gray-500 text-sm">
            © 2026 Pesez Farm Management System. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
