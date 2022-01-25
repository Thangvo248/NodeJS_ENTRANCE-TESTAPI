import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Todo } from "../entity/Todo";
import { User } from "../entity/User";

export const checkstatus = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id;
    const todoRepository = getRepository(Todo);
    let todo: Todo;
    try {
        todo = await todoRepository.findOneOrFail(id);
    } catch (error) {
        res.status(401).send();
        return;
    }

    if (todo.status === "COMPLETE") {
        res.status(401).send();
        return;
    }
    next();

}