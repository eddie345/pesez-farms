import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function UserManagementPage() {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") redirect("/dashboard");

    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-[#2d5a27] mb-2">User Management</h1>
                <p className="text-gray-500">View and manage farm staff and administrators.</p>
            </div>

            <div className="glass p-8 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-100 text-gray-400 text-sm">
                                <th className="pb-4 font-medium uppercase">Name</th>
                                <th className="pb-4 font-medium uppercase">Email</th>
                                <th className="pb-4 font-medium uppercase">Role</th>
                                <th className="pb-4 font-medium uppercase text-right">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-sm">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 font-medium">{user.name}</td>
                                    <td className="py-4">{user.email}</td>
                                    <td className="py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === "ADMIN" ? "bg-purple-100 text-purple-600" : "bg-green-100 text-green-600"
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-4 text-right text-gray-400">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
