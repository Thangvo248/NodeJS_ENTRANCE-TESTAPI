import { Router } from "express";
import UserController from "../controller/UserController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();


//Get all users
router.get("/", checkJwt, UserController.listAll);
//Create a new user
router.post("/signup", UserController.signup);
export default router;
