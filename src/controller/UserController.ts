import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";

class UserController {

  static listAll = async (req: Request, res: Response) => {
    //Get users from database
    const userRepository = getRepository(User);
    const users = await userRepository.find({
      select: ["id", "username"]// no get password
    }
    );

    //Send the users object
    return res.send(users);
  };

  static signup = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { username, password } = req.body;
    let user = new User();
    user.username = username;
    user.password = password;
    //Validade if the parameters are ok
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Hash the password, to securely store on DB
    user.hashPassword();
    //Try to save. If fails, the username is already in use
    const userRepository = getRepository(User);
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send("username already in use");
      return;
    }
    //If all ok, send 201 response
    res.status(201).send("User created");
  };
};

export default UserController;
