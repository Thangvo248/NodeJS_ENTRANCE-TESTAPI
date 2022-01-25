import { Router } from "express";
import TodoController from "../controller/todoController";
import { Todo } from "../entity/Todo";
import { checkJwt } from "../middlewares/checkJwt";
import { checkstatus } from "../middlewares/middlewares";

const router = Router();
//Login route
router.post("/addtodo",checkJwt, TodoController.todoadd);
//update :id todo
router.patch("/update-todo/:id",[checkJwt,checkstatus], TodoController.updatetodo);
//delete :id todo
router.delete("/:id",[checkJwt,checkstatus], TodoController.removetodo);
//Get All todp
router.get("/",checkJwt, TodoController.getAll);
//Get Oneid todo
router.get("/:id",checkJwt,TodoController.getOneById);
//patch todo
router.patch("/Assign-todo/:id",checkJwt,TodoController.assigntodo);
//GetAll taskByUser
router.get("/getAllTask/:id",checkJwt,TodoController.getAllTask)
export default router;
