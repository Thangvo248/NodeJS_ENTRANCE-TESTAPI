import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Todo } from "../entity/Todo";
import todo from "../routers/todo";

class TodoController {
    static todoadd = async (req: Request, res: Response) => {
        let { nameofTask, description, dateofCompletion, status, userId} = req.body;
        if (status != "NEW" && status != "COMPLETE") {
            res.send("status does not exist")
            return;
        }
        let todo = new Todo();
        todo.name = nameofTask;
        todo.description = description;
        todo.dateOfCompletion = dateofCompletion;
        todo.status = status;
        todo.userId = userId;

        //Get todo from database
        const todoRepository = getRepository(Todo);
        try {
            await todoRepository.save(todo);
        } catch (err) {
            res.status(409).send(err);
            return;
        }
        res.status(201).send("todo created");

    }
    static updatetodo = async (req: Request, res: Response) => {
        const id = req.params.id;
        let { nameofTask, description, dateofCompletion, status, userId } = req.body;
        if (status != "NEW" && status != "COMPLETE") {
            res.send("status does not exist")
            return;
        }
        //Get todo from database
        const todoRepository = getRepository(Todo);
        let todo: Todo;
        try {
            todo = await todoRepository.findOneOrFail(id);
        } catch (id) {
            res.status(401).send();
        }
        todo.name = nameofTask;
        todo.description = description;
        todo.dateOfCompletion = dateofCompletion;
        todo.status = status;
        todo.userId = userId;
        todoRepository.save(todo);

        res.status(200).send('Update Successfully');
    }
    static removetodo = async (req: Request, res: Response) => {
        //Get id from parmas
        const id = req.params.id;
        const todoRepository = await getRepository(Todo);
        let todo: Todo;
        try {
            todo = await todoRepository.findOneOrFail(id);

        } catch (error) {
            res.status(404).send("Todo not found");
            return;
        }
        //Delete todo
        todoRepository.delete(id);
        res.status(200).send("Delete Successfully");
    }
    static getAll = async (req: Request, res: Response) => {
        const todoRepository = await getRepository(Todo);
        const todo = await todoRepository.find();
        return res.send({ todo });
    }
    static getOneById = async (req: Request, res: Response) => {
        const id: number = req.params.id;
        //Get todo from database
        const todoRepository = getRepository(Todo);
        let todo: Todo;
        try {
            todo = await todoRepository.findOneOrFail(id);
        } catch (err) {
            res.status(404).send("Todo no found");
            return;
        }
        return res.send({ todo });
    }
    static assigntodo = async (req: Request, res: Response) => {
        const id = req.params.id;
        //get values
        const { userId } = req.body;
        //get jwt userId
        const jwtuserId = res.locals.jwtPayload.userId;
        if (userId === jwtuserId) {
            res.status(400).send("You cannot ASSIGN-TO-DO for yourself");
            return;
        }

        const todoRepository = getRepository(Todo);
        let todo: Todo;
        try{
            todo = await todoRepository.findOneOrFail(id);
        }catch(error)
        {
            res.status(404).send("Todo not found");
            return;
        }
        todo.userId= userId;

        try{
            await todoRepository.save(todo);
        }catch(error) {
            res.status(404).send(error);
            return;
        }
        res.status(200).send("ASSIGN-TO-DO Successfully");
    }
    static getAllTask = async (req: Request, res: Response) => {
        const id = req.params.id;

        const todoRepository = getRepository(Todo);
        try{
            const todo = await todoRepository.find({userId: id});
        }catch(err){
            res.status(404).send("todo not found");
            return;
        }
        return res.send(todo);
    }
}
export default TodoController;
