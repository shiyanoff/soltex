import { prisma } from "@/lib/prisma.js";

export const getAll = () => {
    return prisma.category.findMany({
        orderBy: { createdAt: "asc" },
    });
};

export const getById = (id: number) => {
    return prisma.category.findUnique({
        where: { id },
    });
};

export const create = (data: { title: string }) => {
    return prisma.category.create({
        data,
    });
};

export const update = (id: number, data: { title?: string }) => {
    return prisma.category.update({
        where: { id },
        data,
    });
};

export const remove = (id: number) => {
    return prisma.category.delete({
        where: { id },
    });
};
