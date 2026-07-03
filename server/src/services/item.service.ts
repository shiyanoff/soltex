import { prisma } from "@/lib/prisma.js";

export const getAll = () => {
    return prisma.item.findMany({
        orderBy: { createdAt: "asc" },
    });
};
