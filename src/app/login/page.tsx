import LoginForm from "@/components/login-form";

export default function LoginPage() {
    return (
        <div className="relative min-h-screen flex items-center justify-center px-6">
            <div className="bg-mesh" />

            <div className="max-w-md w-full">
                <div className="flex justify-center mb-12">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#2d5a27] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">P</div>
                        <span className="text-3xl font-bold tracking-tight text-[#2d5a27]">Pesez Farms</span>
                    </div>
                </div>

                <LoginForm />

                <p className="text-center mt-12 text-gray-400 text-xs uppercase tracking-[0.2em] font-medium">
                    Powered by AgriTech Solutions
                </p>
            </div>
        </div>
    );
}
