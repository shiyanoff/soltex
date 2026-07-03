import { Request, Response } from "express";
import * as service from "../services/lead.service.js";
import {sendLeadEmail} from "@/services/mail.service.js";

export const getAll = async (req: Request, res: Response) => {
    const data = await service.getAll();
    res.json(data);
};

export const getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await service.getById(id);
    res.json(data);
};

export const create = async (req: Request, res: Response) => {
    try {
        const { organization, name, phone, email, comment } = req.body;

        if (!name || !phone) {
            return res.status(400).json({
                error: "Имя и телефон обязательны",
            });
        }

        const data = await service.create({
            organization,
            name,
            phone,
            email,
            comment,
        });

        console.log("Sending email...");

        sendLeadEmail({ organization, name, phone, email, comment })
            .then(() => console.log("Email sent!"))
            .catch((err) => console.error("Email error:", err));

        res.json(data);
    } catch (e) {
        console.error(e);
        res.status(500).json({
            error: "Ошибка при создании заявки",
        });
    }
};
