import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const existing = await prisma.admin.findUnique({
        where: { username: "admin" },
    });

    if (existing) {
        console.log("⚠️ Admin уже существует");
        return;
    }

    const hash = await bcrypt.hash("admin", 10);

    await prisma.admin.create({
        data: {
            username: "admin",
            password: hash,
        },
    });

    console.log("✅ Admin создан");
}

main();
