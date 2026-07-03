import { prisma } from "@/lib/prisma.js";

export const getAll = () => {
    return prisma.lead.findMany({
        orderBy: { id: "desc" },
    });
};

export const getById = (id: number) => {
    return prisma.lead.findUnique({
        where: { id },
    });
};

export const create = (data: {
    organization: string;
    name: string;
    phone: string;
    email: string;
    comment?: string;
}) => {
    return prisma.lead.create({
        data,
    });
};
