import { prisma } from "@/lib/prisma.js";

export const getContent = () => {
    return prisma.homepageContent.findFirst();
};
