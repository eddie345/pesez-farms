"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function recordEggProduction(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authenticated" };

    const quantity = parseInt(formData.get("quantity") as string);
    const date = formData.get("date") ? new Date(formData.get("date") as string) : new Date();

    if (isNaN(quantity)) return { error: "Invalid quantity" };

    try {
        await prisma.eggsProduction.create({
            data: {
                quantity,
                date,
                userId: session.user.id,
            },
        });
        revalidatePath("/dashboard");
        revalidatePath("/dashboard/analytics");
        return { success: true };
    } catch (error) {
        console.error("Error recording eggs:", error);
        return { error: "Failed to record eggs" };
    }
}

export async function recordEggSales(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authenticated" };

    const quantity = parseInt(formData.get("quantity") as string);
    const amount = parseFloat(formData.get("amount") as string);
    const date = formData.get("date") ? new Date(formData.get("date") as string) : new Date();

    if (isNaN(quantity) || isNaN(amount)) return { error: "Invalid input" };

    try {
        await prisma.eggSales.create({
            data: {
                quantity,
                amount,
                date,
                userId: session.user.id,
            },
        });
        revalidatePath("/dashboard");
        revalidatePath("/dashboard/analytics");
        return { success: true };
    } catch (error) {
        console.error("Error recording sales:", error);
        return { error: "Failed to record sales" };
    }
}

export async function recordFeedUsage(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authenticated" };

    const quantity = parseFloat(formData.get("quantity") as string);
    const cost = parseFloat(formData.get("cost") as string);
    const type = formData.get("type") as string;
    const date = formData.get("date") ? new Date(formData.get("date") as string) : new Date();

    if (isNaN(quantity) || isNaN(cost) || !type) return { error: "Invalid input" };

    try {
        await prisma.feedStock.create({
            data: {
                quantity,
                cost,
                type,
                date,
                userId: session.user.id,
            },
        });
        revalidatePath("/dashboard");
        revalidatePath("/dashboard/analytics");
        return { success: true };
    } catch (error) {
        console.error("Error recording feed:", error);
        return { error: "Failed to record feed usage" };
    }
}
