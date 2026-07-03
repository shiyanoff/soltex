import { Request, Response } from "express";
import * as homepage from "../services/homepage.service.js";

export const getOne = async (req: Request, res: Response) => {
    try {
        const data = await homepage.getContent();
        res.json(data);
    } catch (e) {
        res.status(500).json({ message: "Ошибка получения контента" });
    }
};
