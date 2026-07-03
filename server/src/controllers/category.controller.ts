import { Request, Response } from "express";
import * as service from "../services/category.service.js";

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
    const data = await service.create(req.body);
    res.json(data);
};

export const update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await service.update(id, req.body);
    res.json(data);
};

export const remove = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await service.remove(id);
    res.json({ success: true });
};
