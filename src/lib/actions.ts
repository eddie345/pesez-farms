"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createEggsProduction(quantity: number) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    const userId = session.user.id;
    await prisma.eggsProduction.create({
        data: {
            quantity,
            userId,
        },
    });

    revalidatePath("/dashboard/eggs");
}

export async function getEggsProductions() {
    return await prisma.eggsProduction.findMany({
        include: { user: true },
        orderBy: { createdAt: "desc" },
    });
}

export async function createFeedStock(quantity: number, type: string) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    const userId = session.user.id;
    await prisma.feedStock.create({
        data: {
            quantity,
            type,
            userId,
        },
    });

    revalidatePath("/dashboard/feed");
}

export async function createMortalityRecord(count: number, cause?: string) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    const userId = session.user.id;
    await prisma.mortalityRecords.create({
        data: {
            count,
            cause,
            userId,
        },
    });

    revalidatePath("/dashboard/mortality");
}
