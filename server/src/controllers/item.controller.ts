import { Request, Response } from "express";
import * as service from "../services/item.service.js";

export const getAll = async (req: Request, res: Response) => {
    try {
        const data = await service.getAll();
        res.json(data);
    } catch (e) {
        res.status(500).json({ message: "Ошибка получения работ" });
    }
};
