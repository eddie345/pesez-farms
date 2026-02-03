import { auth, signOut } from "@/auth";
import { SidebarToggle } from "@/components/sidebar-toggle";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <SidebarToggle session={session} mainContent={children}>
            {/* The signOut form is passed as children to be rendered at the bottom of the sidebar */}
            <form
                action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                }}
            >
                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-xl transition-all">
                    <span>🚪</span> Sign Out
                </button>
            </form>
        </SidebarToggle>
    );
}
